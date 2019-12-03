# uses hub module https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2
# we modified it to take segments of images in and recombine them to a final image to make a collage
# we had to resize images to be able to recombine them when doing a collage because the hub module 
# resizes images in an unknown fashion.  Input image sizes are stored, and the adjusted output image 
# is resized to be the same size as the input before sending back to the frontend



import tensorflow as tf
tf.enable_eager_execution()

import tensorflow_hub as hub
import cv2 as cv
import numpy as np
import PIL.Image
from keras import backend as K


hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')


# Based on what I've seen the code rounds up to the next multiple of the image and then rounds to the next even number if odd
def calc_resize_shape(x_shape, y_shape, num_rows, num_cols):

    # resize to next even multiple for x-dim
    if(x_shape%num_rows != 0):
        #this is resizing to next multiple, regardless if output is even or not
        x_shape = int(x_shape + (num_rows - x_shape % num_rows))

        # now make sure that the values for x are even when divided
        x_divided = int(x_shape/num_rows)
        # if odd
        if((x_divided)%2):
            x_shape = (x_divided + 1) * num_rows

    if(y_shape%num_cols != 0):
        y_shape = int(y_shape + (num_cols - y_shape % num_cols))

        # now make sure that the values for x are even when divided
        y_divided = int(y_shape/num_cols)
        # if odd
        if((x_divided)%2):
            y_shape = (y_divided + 1) * num_cols

    return (x_shape, y_shape)

# Making the edit in load image since we are saving the file to our db and then loading it in
def load_img(path_to_img, num_rows, num_cols):
    # load just like normal
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)

    orig_shape = img.shape

    # resize if need be
    resize_shape = calc_resize_shape(img.shape[0], img.shape[1], num_rows, num_cols)

    img = tf.image.resize(img, resize_shape)

    img = img[tf.newaxis, :]
    
    return img, orig_shape

def np_tensor(tensor):
    tensor = tensor*255
    return np.array(tensor, dtype=np.uint8)


def tensor_to_image(tensor):
    tensor = np_tensor(tensor)
    if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
    return PIL.Image.fromarray(tensor)


def next_highest_multiple(num, divisor):
    return (num + (divisor - num%divisor))

def crop_into_x_parts(img, num_rows=3, num_cols=2):
    '''
    We should have a max number of parts verified before here

    '''

    np_tensor = img.numpy()

    # split the rows
    row_split = np.array_split(np_tensor, num_rows, axis=1)

    final = []
    for row in row_split:
        final = final + np.array_split(row, num_cols, axis=2)
    return final


def stylize_helper(content_img, style_img):
    '''
    Helper function that imposes the style of the style picture onto the content image

    *receives a full image or components of collage image
    '''

    return hub_module(tf.constant(content_img), tf.constant(style_img))[0]


def collage_maker(content_img, style_paths, num_rows, num_cols):
    '''
    More work:
        needs to also handle the case that no style is applied to a segment
    '''

    # verify that enough styles have been chosen for the number of segments
    assert len(style_paths) == num_rows*num_cols

    # first make image segments
    segments = crop_into_x_parts(content_img, num_rows, num_cols)

    # combine segment with desired style
    segment_styles = list(zip(segments, style_paths))

    # initialize the output
    segment, style_path = segment_styles[0]
    if style_path is not None:
        style = load_img(style_path)
        output = stylize_helper(segment, style)
        out_shape = output.shape

    else:
        output = tf.constant(segment)
        out_shape = output.shape

    # list of tensors where each entry is a row tensor
    output_rows = []
    output_rows.append(output)


    # apply style on each segement (assuming style matches in list for segment)
    # goes for each row then for each column in that row
    counter_col_in_row = 1
    counter_rows = 0
    for segment, style_path in segment_styles[1:]:

        # might have bugs but adding for now
        if style_path is None:
            styled_segment = tf.constant(segment)

        else:
            style = load_img(style_path)
            styled_segment = stylize_helper(segment, style)

        # keeps track of where to combine to the final output image
        if counter_col_in_row < num_cols:
            # add to the next column of the row
            output_rows[counter_rows] = tf.concat([output_rows[counter_rows], styled_segment], axis=2) # TODO: BUG HERE IF THE LAST ENTRY IS NONE
            counter_col_in_row = counter_col_in_row + 1

        else:
            # create a new row in the output rows segment
            output_rows.append(styled_segment)

            # update counter_rows
            counter_rows = counter_rows + 1
            counter_col_in_row = 1

    output = output_rows[0]
    for row in output_rows[1:]:
        output = tf.concat([output, row], axis=1)

    return output

def stylize(content_img, orig_shape, styles, num_rows=None, num_cols=None):

    if num_rows and num_cols:
        collage = collage_maker(content_img, styles, num_rows, num_cols)
        # need to reshape image here if it doesn't match the input size
        img = tensor_to_image(collage)
        return img.resize(orig_shape)

    else:
        styled = stylize_helper(content_img, styles[0])
        img = tensor_to_image(styled)
        return img.resize(orig_shape)




''' This is the callable function that will be called from the backend '''
def get_styled_image(file_path, styles, num_rows=1, num_cols=1):
    """ Creates a styled image based on predefined filters on the backend

    Returns an image that has been stylized.  A user would send up and image and
    a list of filters they want to apply.  The returned image would be the same
    image but with styles applied through style transfer.


    Parameters
    ----------

    file_path:  string
                String with the file path of the image to be stylized.  This
                image is posted up to our server and saved to the server.

    styles:     array_like
                1-d array containing the filters that the user would like to
                apply to the input image.  If the user selects a collage, the
                array would have multiple values with size num_rows*num_cols.
                If the user does not select a collage, the size is 1 with just
                1 filter to be applied to the image.

    num_rows:   int
                Number of rows that the user selected to use.  If the value is
                not specified, it is assumed that the user did not want to make
                a collage; therefore, the number of rows would be 1 and the
                number of columns would be 1

    num_cols:   int
                Number of columns that the user selected to use.  If the value
                is not specified, it is assumed that the user did not want to
                make a collage; therefore, the number of rows would be 1 and the
                number of columns would be 1


    Returns
    ----------

    output_image:   still need to decide on this but currently I have it return
                    an image that is a PIL image.  We need to talk about this
                    more when the backend starts being built.

    """

    img, orig_shape = load_img(file_path, num_rows, num_cols)

    return stylize(img, orig_shape, styles, num_rows, num_cols)

