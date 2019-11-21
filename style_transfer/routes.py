from style_transfer import get_styled_image
from flask import Flask
from flask import send_file
from flask import request, session

# from flask_cors import CORS, cross_origin
routes = Flask(__name__)

from werkzeug.datastructures import ImmutableMultiDict

from flask import request, jsonify, Response, render_template
# from PIL import Image

from werkzeug import secure_filename

import style_transfer

PATH_TO_TEST_IMAGES_DIR = './images'

import numpy

import os
import logging
from flask_cors import CORS, cross_origin
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')
UPLOAD_FOLDER = './../'
routes.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import base64
# import cv2
# from cv2 import cv

# Example calling
# styles = ['./../../groups.PNG', './../../navisworksInstallDirections.PNG']
# output_img = get_styled_image('./../../groups.PNG', styles, num_rows=2, num_cols=1)
# output_img.save('./../out_img.jpg')

# clays stuff
import tensorflow as tf
tf.enable_eager_execution()

import tensorflow_hub as hub
#import cv2 as cv
import numpy as np
import PIL.Image
import os

# Has to have this for some reason...make sure to do this first time you run the
# code.
os.environ["TFHUB_CACHE_DIR"] = '/tmp/tfhub'
hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

'''
https://stackoverflow.com/questions/43309343/working-with-user-uploaded-image-in-flask

Link to a stackoverflow post where the guy did something very similar to what we are doing.

Also here is some documentation on flask and how to test it and get it to run: 
https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment

Another link for reference: https://github.com/matt-sm/create-react-flask
'''
counter = 0
styles = ['./../ArtistPics/dali.jpg', './../ArtistPics/monet.jpg', './../ArtistPics/picasso.jpg',
          './../ArtistPics/pollock.jpg', './../ArtistPics/van_gogh.jpg']


@routes.route("/")
def index():
    return "Hello World!"


@routes.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        '''
        target = os.path.join(UPLOAD_FOLDER, 'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        logger.info("welcome to upload`")
        file = request.files['file']
        filename = secure_filename(file.filename)
        destination = "/".join([target, filename])
        file.save(destination)
        session['uploadFilePath'] = destination
        response = "Whatever you wish too return"
        return response
        '''
        # read image file string data
        # filestr = request.files['file'].read()
        # convert string data to numpy array
        # npimg = numpy.fromstring(filestr, numpy.uint8)
        # ret = str(type(npimg))

        # filestr = request.files['uri'].read()
        # ret = str(type(filestr))
        # data = dict(request.form)
        # print(data)
        # return data
        '''
        rows = request.values.get('rows')
        cols = request.values.get('cols')
        arr = request.values.get('arr')
        arr = arr[1:]
        ret_arr = []
        for x in arr[::2]:
            ret_arr.append(x)
        print('rows: ' + rows + '   cols: ' + cols + '  array element 1: ' + ret_arr[0])
        return 'rows: ' + rows + '   cols: ' + cols + '  array element 1: ' + ret_arr[0]
        '''

        rows = request.form['rows']
        cols = request.form['cols']
        arr = request.form['arr']
        arr = list(map(int, arr))
        # print(type(arr))
        # arr = arr[1:]
        # ret_arr = []
        # for x in arr[::2]:
        #    ret_arr.append(x)
        # print('rows: ' + rows + '   cols: ' + cols + ' arr:  ' + arr[0])
        # return 'rows: ' + rows + '   cols: ' + cols + ' arr:  ' + arr[0]

        global counter
        image_num = str(counter)

        file = request.form['image']
        # print(type(file))
        # print(file)
        # print(file[-30:])
        #
        # file = file[:-4]
        # print(file[-30:])

        # filename = './../IncomingImage' + image_num
        # file.save(filename + '.jpg')

        imgdata = base64.b64decode(file)
        filename = './../IncomingImage' + image_num + '.jpg'
        # imgdata.save(filename + '.jpg')
        with open(filename, 'wb') as f:
            f.write(imgdata)
        # f gets closed when you exit the with statement
        # Now save the value of filename to your database

        global styles
        # selected_styles = [styles[0], styles[1]]  # Add None if no style
        selected_styles = []
        print("styles: ", styles)
        print('styles type: ', type(styles))
        for x in arr:
            print('x: ', x)
            selected_styles.append(styles[int(x)])

        # output_img = get_styled_image(filename + '.jpg', selected_styles, num_rows=2, num_cols=1)
        # output_img = get_styled_image(filename, selected_styles, num_rows=2, num_cols=1)
        output_img = get_styled_image(filename, selected_styles, num_rows=rows, num_cols=cols)
        output_img.save('./../returnImage' + image_num + '.jpg')
        counter = counter + 1

        # return send_file('../returnImage' + image_num + '.jpg', mimetype='image/jpg')
        return send_file('./../IncomingImage' + image_num + '.jpg', mimetype='image/jpg')
        # return "output_img"

        # return "done"
        # convert numpy array to image

        # img = cv2.imdecode(npimg, cv2.CV_LOAD_IMAGE_UNCHANGED)

        # num_rows = request.files['rows']
        # num_rows = request.get_json('rows')
        # num_cols = request.get_json('cols')
        # return num_rows + '    ' + num_cols
        # data = request.get_json('height')
        # return data

        # data = dict(request.form)
        # value = dict['uri']  # get the `value` of `key` in `dictionary`.
        # dict[key] = newvalue  # change the content of `key` in `dictionary` to `newvalue`.

        '''
        # uploaded_files = request.files.getlist("file[]")
        # height = uploaded_files.pop()

        global counter
        image_num = str(counter)

        file = request.files['uri']
        filename = './../IncomingImage' + image_num
        file.save(filename + '.jpg')

        # height = request.files['height']
        # width = request.files['width']

        # ret_height = str(height)
        # ret_width = str(width)

        global styles
        selected_styles = [styles[0], styles[1]] #Add None if no style

        output_img = get_styled_image(filename + '.jpg', selected_styles, num_rows=2, num_cols=1)
        output_img.save('./../returnImage' + image_num + '.jpg')
        counter = counter + 1
        return './../returnImage' + image_num + '.jpg'
        '''
    else:
        return "This is a GET bro"


if __name__ == "__main__":
    # routes.run(host='0.0.0.0')
    routes.secret_key = os.urandom(24)
    routes.run(host="0.0.0.0", use_reloader=False)


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
    print('**************************')
    # load just like normal
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)


    # if i edit for PIL images
    # the above code results in an eager tensor of shape (height, width, channels)
    # img = tf.convert_to_tensor(path_to_img)

    orig_shape = (img.shape[1], img.shape[0])

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
        style, _ = load_img(style_path, num_rows, num_cols)
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
            style, _ = load_img(style_path, num_rows, num_cols)
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

# Example calling
# styles = ['./../../code/test_images/j_pollock.jpg', './../../code/test_images/lillies.jpg']
# output_img = get_styled_image('./../../code/test_images/dogs.jpg', styles, num_rows=2, num_cols=1)
# output_img.save('./../../../../../../../out_img.jpg')

# img = PIL.Image.open('c:./../../code/test_images/j_pollock.jpg')
# print(type(img))
# print(img)
#
# # Not the most effieicnt thing, but if it is a PIL image passed, just make it a numpy array then make it a tensor
# # just do an "if PIL image then convert, else, run my code for reading in an image with tensorflow for the styles"
# img = np.asarray(PIL.Image.open('./../../code/test_images/j_pollock.jpg'))
# print(type(img))
# print(img.shape)

flask_cors.CORS(routes, expose_headers='Authorization')

