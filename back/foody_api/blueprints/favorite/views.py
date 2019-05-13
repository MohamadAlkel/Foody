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

favorite_api_blueprint = Blueprint('favorite_api',
                                __name__,
                                template_folder='templates')



@favorite_api_blueprint.route('/new', methods=['POST'])
@jwt_required
def new():

    id_owner = request.json.get('id_owner', None)
    id = get_jwt_identity()
    favorite = Favorite(
        user= id,
        chef=  id_owner
    )

    favorite.save()

    return jsonify({
        "message": "Successfully make a new item.",
        "status": "success",
        "user": {
            "id": id,
        }
    }), 200


@favorite_api_blueprint.route('/delete', methods=['POST'])
@jwt_required
def delete():
    id= get_jwt_identity()
    id_owner= request.json.get('id_owner', None)

    delete= Favorite.delete().where(Favorite.user == id , Favorite.chef == id_owner)
    delete.execute()
    
    return jsonify({"msg":"you removing is successful"}),200

 

@favorite_api_blueprint.route('/show', methods=['GET'])
@jwt_required
def index():
    id = get_jwt_identity()
 
    recipes= Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where(Favorite.user_id == id)

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
            "id_owner": recipe.user.id,
            "user_photo": recipe.user.photo
        } for recipe in recipes]
    }), 200



@favorite_api_blueprint.route('/search', methods=['GET'])
@jwt_required
def show_search():
    id = get_jwt_identity()

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
        recipes = Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where((Recipe.countrys == country) & (Favorite.user_id == id) & (Recipe.prep <= prepTime)).order_by(ooo)
    elif country:
         recipes = Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where((Recipe.countrys == country)& (Favorite.user_id == id) ).order_by(ooo)
    elif prepTime:
         recipes = Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where((Recipe.prep <= prepTime)& (Favorite.user_id == id) ).order_by(ooo)
    else:
        recipes = Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where((Favorite.user_id == id) ).order_by(ooo)    
 
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
                "id_owner": recipe.user.id,
                "user_photo": recipe.user.photo
            } for recipe in recipes]
        }), 200
    else:
        return jsonify({"recipe": [], "status": "no recipe"}), 200  





