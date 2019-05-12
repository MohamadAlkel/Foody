from flask import Blueprint, request, jsonify
from models.user import User
from models.recipe import Recipe
from models.favorite import Favorite
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

    numHour= int(hour)
    numMin= int(sec)/100
    prepTime = numHour+numMin


    photo = request.files['photo']
    photoName=time+photo.filename
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
        prep=prepTime,
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



@recipe_api_blueprint.route('/show/<user_id>', methods=['GET'])
def index(user_id):
    user = User.get_or_none(User.id == user_id)
    recipes = Recipe.select().where(Recipe.user_id == user_id)

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
            "user_id": user.id,
            "user_photo": user.photo
        } for recipe in recipes]
    }), 200


@recipe_api_blueprint.route('/delete', methods=['POST'])
@jwt_required
def delele_recipe():
    id= get_jwt_identity()
    recipe_id= request.json.get('recipe_id', None)

    user= User.get_or_none(User.id==id)
    recipe= Recipe.get_or_none(Recipe.id == recipe_id)

    delete= Recipe.delete().where(Recipe.user_id == user.id , Recipe.id == recipe.id)
    delete.execute()
    return jsonify({"msg":"you removing is successful"}),200


@recipe_api_blueprint.route('/show/for/all', methods=['GET'])
@jwt_required
def index_all():
    id = get_jwt_identity()

    favorites = Favorite.select().join(User, on=Favorite.user_id).switch(Favorite).where(Favorite.user_id==id)
    excluded_chefs = [c.chef_id for c in favorites]
    recipes = Recipe.select().where((Recipe.user_id != id) & Recipe.user_id.not_in(excluded_chefs))
   
    return jsonify({
        "status": "success",
        "recipe": [{
            "id":recipe.id,
            "id_owner":recipe.user.id,
            "id_user":str(id),
            "name": recipe.name,
            "photo": recipe.photo,
            "countrys": recipe.countrys,
            "hour": recipe.hour,
            "sec": recipe.sec,
            "directions": recipe.directions,
            "ingredients": recipe.ingredients,
            "time": recipe.time,
            "username": recipe.user.username,
            "user_id": recipe.user.id,
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
            "user_id": recipe.user.id,
            "user_photo": recipe.user.photo
        } for recipe in recipes]
    }), 200    



@recipe_api_blueprint.route('/number/<user_id_param>', methods=['GET'])
def index_number(user_id_param):
   
    favorites = Favorite.select().join(User, on=Favorite.user_id).switch(Favorite).where(Favorite.user_id==user_id_param)
    following = len([c.chef_id for c in favorites])

    favorites = Favorite.select().join(User, on=Favorite.user_id).switch(Favorite).where(Favorite.chef_id==user_id_param)
    followers = len([c.user_id for c in favorites])

    my_recipes = Recipe.select().where(Recipe.user_id==user_id_param)
    recipes = len([c.id for c in my_recipes])

    return jsonify({
        "status": "success",
        "number": {
            "following":following,
            "followers": followers,
            "recipes": recipes ,
        } 
    }), 200 


@recipe_api_blueprint.route('/search', methods=['GET'])
@jwt_required
def show_search():
    id = get_jwt_identity()
    favorites = Favorite.select().join(User, on=Favorite.user_id).switch(Favorite).where(Favorite.user_id==id)
    excluded_chefs = [c.chef_id for c in favorites]

    hour= request.args.get('hour')
    sec= request.args.get('sec')
    country= request.args.get('country')
    order= request.args.get('order')

    if order == "Time to prepare":
       ooo =Recipe.prep
    elif order == "":   
       ooo =Recipe
    elif order == "Recently":   
       ooo =Recipe.created_at.desc()  

    prepTime = None
    if sec and hour:  
        prepTime = int(hour) + (int(sec) / 100)
    elif sec:
        prepTime = (int(sec) / 100)
    elif hour:
        prepTime = int(hour)
        
    recipes = False
    if country and prepTime:
        recipes = Recipe.select().where((Recipe.countrys == country) & (Recipe.user_id != id) & (Recipe.prep <= prepTime)& Recipe.user_id.not_in(excluded_chefs)).order_by(ooo)
    elif country:
         recipes = Recipe.select().where((Recipe.countrys == country)& (Recipe.user_id != id) & Recipe.user_id.not_in(excluded_chefs)).order_by(ooo)
    elif prepTime:
         recipes = Recipe.select().where((Recipe.prep <= prepTime)& (Recipe.user_id != id) & Recipe.user_id.not_in(excluded_chefs)).order_by(ooo)
    else:
        recipes = Recipe.select().where((Recipe.user_id != id) & Recipe.user_id.not_in(excluded_chefs)).order_by(ooo)
    
    if recipes:
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
                "user_id": recipe.user.id,
                "user_photo": recipe.user.photo
            } for recipe in recipes]
        }), 200
    else:
        return jsonify({"recipe": [], "status": "no recipe"}), 200       




@recipe_api_blueprint.route('/search/all', methods=['GET'])
def show_search_all():
    hour= request.args.get('hour')
    sec= request.args.get('sec')
    country= request.args.get('country')
    order= request.args.get('order')

    if order == "Time to prepare":
       ooo =Recipe.prep
    elif order == "":   
       ooo =Recipe
    elif order == "Recently":   
       ooo =Recipe.created_at.desc()  

    prepTime = None
    if sec and hour:  
        prepTime = int(hour) + (int(sec) / 100)
    elif sec:
        prepTime = (int(sec) / 100)
    elif hour:
        prepTime = int(hour)
        
    recipes = False
    if country and prepTime:
        recipes = Recipe.select().where((Recipe.countrys == country) & (Recipe.prep <= prepTime)).order_by(ooo)
    elif country:
         recipes = Recipe.select().where((Recipe.countrys == country)).order_by(ooo)
    elif prepTime:
         recipes = Recipe.select().where((Recipe.prep <= prepTime)).order_by(ooo)
    else:
        recipes = Recipe.select().order_by(ooo)
        
    if recipes:
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
                "user_id": recipe.user.id,
                "user_photo": recipe.user.photo
            } for recipe in recipes]
        }), 200
    else:
        return jsonify({"recipe": [], "status": "no recipe"}), 200              