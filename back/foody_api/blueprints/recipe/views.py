from flask import Blueprint, request, jsonify
from models.user import User
from models.recipe import Recipe
from werkzeug.security import generate_password_hash
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required
)
from google.cloud import storage



recipe_api_blueprint = Blueprint('recipe_api',
                                __name__,
                                template_folder='templates')


@recipe_api_blueprint.route('/', methods=['GET'])
def createi():
    return '<h1>lol</h1>'


    

# @recipe_api_blueprint.route('/new', methods=['POST'])
# @jwt_required
# def new():

#     username= request.form.get('username', None)
#     work = request.form.get('work', None)
#     brief = request.form.get('brief', None)
#     photo = request.files['photo']


#     client = storage.Client()
#     bucket = client.get_bucket('foodymhd')
#     myBlob = bucket.blob(photo.filename)

#     myBlob.upload_from_string(photo.read())

   
#     id = get_jwt_identity()

#     # errors=[]
#     # if not name:
#     #     errors.append('name')
#     # # if not file_name:
#     # #     errors.append('file_name')
#     # if not tag_parent:
#     #     errors.append('tag_parent')
#     # if not tag_children:
#     #     errors.append('tag_children')
#     # if not description:
#     #     errors.append('description')
#     # if errors:
#     #     return jsonify({"msg":{"Missing Parameters":[error for error in errors]}}), 400

#     # breakpoint() 

#     user = User.get_or_none(User.id == id)
#     user.username = username
#     user.photo = myBlob.public_url
#     user.work = work
#     user.brief = brief
#     user.save()

#     # user = User(username= username,photo= myBlob.public_url, work=work,
#     #             brief=brief)
#     # user.save()


#     url_photo = user.photo
    
#     return jsonify({
#         "message": "Successfully make a new item.",
#         "status": "success",
#         "user": {
#             "id": id,
#             "username": username,
#             "work": work,
#             "brief": brief,
#             "photo": url_photo
#         }
#     }), 200





