from style_transfer import get_styled_image
from flask import Flask
#from flask_cors import CORS, cross_origin
routes = Flask(__name__)

from flask import request, jsonify, Response, render_template
# from PIL import Image

from werkzeug import secure_filename
import style_transfer

PATH_TO_TEST_IMAGES_DIR = './images'

# Example calling
styles = ['./../../groups.PNG', './../../navisworksInstallDirections.PNG']
output_img = get_styled_image('./../../groups.PNG', styles, num_rows=2, num_cols=1)
output_img.save('./../out_img.jpg')

'''
https://stackoverflow.com/questions/43309343/working-with-user-uploaded-image-in-flask

Link to a stackoverflow post where the guy did something very similar to what we are doing.

Also here is some documentation on flask and how to test it and get it to run: 
https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment

Another link for reference: https://github.com/matt-sm/create-react-flask
'''


@routes.route("/")
def index():
    return "Hello World!"

@routes.route('/upload', methods = ['GET','POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        print(file)
        file.save('./../fromGUI_img.jpg')
        return "done"
    else:
        return "This is a GET bro"

#
# @routes.route("/uploader", methods=["GET","POST"])
# def get_image():
#     f = request.files['file']
#     styles = request.files['styles']
#     num_rows = request.files['rows']
#     num_cols = request.files['cols']
#     # sfname = 'images/'+str(secure_filename(f.filename))
#     # f.save(sfname)
#
#     x = style_transfer.get_styled_image(f, styles, num_rows, num_cols)
#     return x
#     # return render_template('result.html', x, imgpath = sfname)
#
if __name__ == "__main__":
    routes.run()