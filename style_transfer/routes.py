from style_transfer import get_styled_image
from flask import Flask
from flask import send_file
from flask import request
#from flask_cors import CORS, cross_origin
routes = Flask(__name__)

from werkzeug.datastructures import ImmutableMultiDict

from flask import request, jsonify, Response, render_template
# from PIL import Image

from werkzeug import secure_filename
import style_transfer

PATH_TO_TEST_IMAGES_DIR = './images'

import numpy
#import cv2
#from cv2 import cv

# Example calling
# styles = ['./../../groups.PNG', './../../navisworksInstallDirections.PNG']
# output_img = get_styled_image('./../../groups.PNG', styles, num_rows=2, num_cols=1)
# output_img.save('./../out_img.jpg')

'''
https://stackoverflow.com/questions/43309343/working-with-user-uploaded-image-in-flask

Link to a stackoverflow post where the guy did something very similar to what we are doing.

Also here is some documentation on flask and how to test it and get it to run: 
https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment

Another link for reference: https://github.com/matt-sm/create-react-flask
'''
counter = 0
styles = ['./../ArtistPics/dali.jpg', './../ArtistPics/monet.jpg', './../ArtistPics/picasso.jpg', './../ArtistPics/pollock.jpg', './../ArtistPics/van_gogh.jpg']


@routes.route("/")
def index():
    return "Hello World!"


@routes.route('/upload', methods = ['GET','POST'])
def upload_file():
    if request.method == 'POST':
        # read image file string data
        # filestr = request.files['file'].read()
        # convert string data to numpy array
        # npimg = numpy.fromstring(filestr, numpy.uint8)
        # ret = str(type(npimg))
        # return ret
        # convert numpy array to image
        # img = cv2.imdecode(npimg, cv2.CV_LOAD_IMAGE_UNCHANGED)

        # num_rows = request.files['rows']
        # num_rows = request.get_json('rows')
        # num_cols = request.get_json('cols')
        # return num_rows + '    ' + num_cols
        # data = request.get_json('height')
        # return data

        data = dict(request.form)
        return data
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
    routes.run(host='0.0.0.0')
