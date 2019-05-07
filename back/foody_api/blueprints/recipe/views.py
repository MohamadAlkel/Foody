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


# @recipe_api_blueprint.route('/', methods=['GET'])
# def createi():
#     return '<h1>lol</h1>'



 

@recipe_api_blueprint.route('/new', methods=['POST'])
@jwt_required
def new():

    name= request.form.get('name', None)
    directions = request.form.get('directions', None)
    ingredients = request.form.get('ingredients', None)
    countrys= request.form.get('countrys', None)
    hour = request.form.get('hour', None)
    sec = request.form.get('sec', None)
    time = request.form.get('time', None)

    photo = request.files['photo']
    photoName=time+photo.filename
    # breakpoint()
    client = storage.Client()
    bucket = client.get_bucket('foodymhd')
    myBlob = bucket.blob(photoName)
    myBlob.upload_from_string(photo.read())

   
    id = get_jwt_identity()

    recipe = Recipe(
        name= name,
        photo=  myBlob.public_url,
        directions=directions,
        ingredients=ingredients,
        hour=hour,
        sec=sec,
        countrys=countrys,
        time=time,
        user=id,
    )
    recipe.save()

     
    url_photo = recipe.photo
    
    return jsonify({
        "message": "Successfully make a new item.",
        "status": "success",
        "user": {
            "id": id,
            "name": name,
            "ingredients": ingredients,
            "countrys": countrys,
            "photo": url_photo
        }
    }), 200



@recipe_api_blueprint.route('/show', methods=['GET'])
@jwt_required
def index():
    id = get_jwt_identity()
    user = User.get_or_none(User.id == id)
    # user_id = user.id
    recipes = Recipe.select().where(Recipe.user_id == id)
    
    # id = get_jwt_identity()
    # user = User.get_or_none(User.id == id)
    # cards = Recipe.select().where(Recipe.user_id==user.id)

    # breakpoint()

    return jsonify({
        "status": "success",
        "recipe": [{
            "id":recipe.id,
            "name": recipe.name,
            "photo": recipe.photo,
            "countrys": recipe.countrys,
            "hour": recipe.hour,
            "sec": recipe.sec,
            "directions": recipe.directions,
            "ingredients": recipe.ingredients,
            "time": recipe.time,
            "username": user.username,
            "user_photo": user.photo
        } for recipe in recipes]
    }), 200



@recipe_api_blueprint.route('/delete', methods=['POST'])
@jwt_required
def delele_recipe():

    # breakpoint()
    id= get_jwt_identity()
    recipe_id= request.json.get('recipe_id', None)


    user= User.get_or_none(User.id==id)
    recipe= Recipe.get_or_none(Recipe.id == recipe_id)


    # wishlistDelete = Wishlist.delete().where(Wishlist.item_id==item.id)
    # wishlistDelete.execute()
    delete= Recipe.delete().where(Recipe.user_id == user.id , Recipe.id == recipe.id)
    delete.execute()
    # breakpoint()
    return jsonify({"msg":"you removing is successful"}),200


@recipe_api_blueprint.route('/show/for/all', methods=['GET'])
@jwt_required
def index_all():
    id = get_jwt_identity()
    # user = User.get_or_none(User.id == id)
    # user_id = user.id
    # breakpoint()
    recipes = Recipe.select().where(Recipe.user_id != id)
    
    # id = get_jwt_identity()
    # user = User.get_or_none(User.id == id)
    # cards = Recipe.select().where(Recipe.user_id==user.id)

    # breakpoint()

    return jsonify({
        "status": "success",
        "recipe": [{
            "id":recipe.id,
            "name": recipe.name,
            "photo": recipe.photo,
            "countrys": recipe.countrys,
            "hour": recipe.hour,
            "sec": recipe.sec,
            "directions": recipe.directions,
            "ingredients": recipe.ingredients,
            "time": recipe.time,
            "username": recipe.user.username,
            "user_photo": recipe.user.photo
        } for recipe in recipes]
    }), 200    




@recipe_api_blueprint.route('/show/all', methods=['GET'])
def index_all_user():
   
    recipes = Recipe.select()


    return jsonify({
        "status": "success",
        "recipe": [{
            "id":recipe.id,
            "name": recipe.name,
            "photo": recipe.photo,
            "countrys": recipe.countrys,
            "hour": recipe.hour,
            "sec": recipe.sec,
            "directions": recipe.directions,
            "ingredients": recipe.ingredients,
            "time": recipe.time,
            "username": recipe.user.username,
            "user_photo": recipe.user.photo
        } for recipe in recipes]
    }), 200    