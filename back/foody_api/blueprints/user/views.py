from flask import Blueprint, request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required
)
# from werkzeug.security import check_password_hash
from datetime import datetime,timedelta
from google.cloud import storage
# from google.cloud import storage



users_api_blueprint = Blueprint('users_api',
                                __name__,
                                template_folder='templates')


@users_api_blueprint.route('/', methods=['GET'])
def createi():
    return '<h1>nada</h1>'


@users_api_blueprint.route('/show', methods=['GET'])
@jwt_required
def show_userProfile():
    id = get_jwt_identity()
    user = User.get_or_none(User.id == id)
    # user_id = user.id
    # items = Item.select().where(Item.user_id == user_id)

    return jsonify({
        "status": "success",
        "user": {
            "id":user.id,
            "username": user.username,
            "photo": user.photo,
            "work": user.work,
            "brief": user.brief,
        } 
    }), 200 


@users_api_blueprint.route('/new', methods=['POST'])
@jwt_required
def new():

    username= request.form.get('username', None)
    work = request.form.get('work', None)
    brief = request.form.get('brief', None)
    time = request.form.get("time", None)

    
    # breakpoint()

    if (request.files):
        photo = request.files['photo']
        photoName=time+photo.filename
        client = storage.Client()
        bucket = client.get_bucket('foodymhd')
        myBlob = bucket.blob(photoName)
        myBlob.upload_from_string(photo.read())

   
    id = get_jwt_identity()

    # errors=[]
    # if not name:
    #     errors.append('name')
    # # if not file_name:
    # #     errors.append('file_name')
    # if not tag_parent:
    #     errors.append('tag_parent')
    # if not tag_children:
    #     errors.append('tag_children')
    # if not description:
    #     errors.append('description')
    # if errors:
    #     return jsonify({"msg":{"Missing Parameters":[error for error in errors]}}), 400

    # breakpoint() 

    user = User.get_or_none(User.id == id)
    user.username = username

    if (request.files):
      user.photo = myBlob.public_url

    user.work = work
    user.brief = brief
    user.save()

    # user = User(username= username,photo= myBlob.public_url, work=work,
    #             brief=brief)
    # user.save()

     
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

    # breakpoint()
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    
    user_password = password
    # hashed_password = generate_password_hash(user_password)


    # front_end side will do the validation
    # pattern_password = '\w{6,}'
    # result = re.search(pattern_password, user_password)
    # pattern_email = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]'
    # result_email = re.search(pattern_email,email)


 

    email_check = User.get_or_none(User.email == email)
    
    if not email_check:
        u = User(username=username, email=email, password=generate_password_hash(password))
        u.save()

        user = User.get(User.username == username)
        access_token = create_access_token(identity=user.id)
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
    
    
    # errors = []
    # if not username:
    #     errors.append("username")
    # if not password:
    #     errors.append("password")
    # if errors:
    #     return jsonify({"msg": {"Missing parameters":[error for error in errors]}}), 400

    user = User.get_or_none(User.email == email)
    if user and check_password_hash(user.password, password):
        # user.last_login = time
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
    else:
        return jsonify({"msg": "Bad login"}), 404        