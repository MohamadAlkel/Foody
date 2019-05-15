from flask import Blueprint, request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required
)
from datetime import datetime,timedelta
from google.cloud import storage



users_api_blueprint = Blueprint('users_api',
                                __name__,
                                template_folder='templates')




@users_api_blueprint.route('/show/<user_id>', methods=['GET'])
def show_userProfile(user_id):
    user = User.get_or_none(User.id == user_id)

    if user :
        return jsonify({
            "status": "success",
            "user": {
                "id":user.id,
                "username": user.username,
                "photo": user.photo,
                "work": user.work,
                "brief": user.brief,
                "here":"yes"
            } 
        }), 200 
    else:
        return jsonify({
        "status": "success",
        "user": {
            "here":"no"
        } 
    }), 200 



@users_api_blueprint.route('/new', methods=['POST'])
@jwt_required
def new():
    username= request.form.get('username', None)
    work = request.form.get('work', None)
    brief = request.form.get('brief', None)
    time = request.form.get("time", None)

    if (request.files):
        photo = request.files['photo']
        photoName=time+photo.filename
        client = storage.Client()
        bucket = client.get_bucket('foody-project')
        myBlob = bucket.blob(photoName)
        myBlob.upload_from_string(photo.read())

   
    id = get_jwt_identity()

    user = User.get_or_none(User.id == id)
    user.username = username

    if (request.files):
      user.photo = myBlob.public_url

    user.work = work
    user.brief = brief
    user.save()
     
    url_photo = user.photo
    
    return jsonify({
        "message": "Successfully make a new item.",
        "status": "success",
        "user": {
            "id": id,
            "username": username,
            "work": work,
            "brief": brief,
            "photo": url_photo
        }
    }), 200




@users_api_blueprint.route('/newuser', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    email_check = User.get_or_none(User.email == email)
    
    if not email_check:
        u = User(username=username, email=email, password=generate_password_hash(password))
        u.save()

        user = User.get(User.username == username)
        expires = timedelta(days=365)
        access_token = create_access_token(user.id, expires_delta=expires)
        return jsonify({
            "access_token": access_token,
            "message": "Successfully created a user and signed in.",
            "status": "success",
            "user": {
                "id": user.id,
                "username": user.username
            }
        }), 200
    else:
        return jsonify({"msg": "email already used"}), 400



@users_api_blueprint.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    

    user = User.get_or_none(User.email == email)
    if user and check_password_hash(user.password, password):
        user.save()
        new_user_id = user.id
        expires = timedelta(days=365)
        access_token = create_access_token(new_user_id, expires_delta=expires)

        return jsonify({
            "access_token": access_token,
            "message": "Successfully signed in.",
            "status": "success",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "work": user.work,
                "brief": user.brief
            }
        }), 200
    elif user and not(check_password_hash(user.password, password)):
        return jsonify({"msg": "no password"}), 200 
    else :
        return jsonify({"msg": "bad Login"}), 200    