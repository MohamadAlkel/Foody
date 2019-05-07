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


@favorite_api_blueprint.route('/', methods=['GET'])
def createi():
    return '<h1>lol</h1>'


@favorite_api_blueprint.route('/new', methods=['POST'])
@jwt_required
def new():

    id_owner = request.json.get('id_owner', None)
    id = get_jwt_identity()
    # id_user= request.form.get('id_user', None)
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


    # breakpoint()
    id= get_jwt_identity()
    id_owner= request.json.get('id_owner', None)


    # chef= Favorite.get_or_none(Favorite.chef==id_owner)
    # user= Favorite.get_or_none(Favorite.user==id)


    # wishlistDelete = Wishlist.delete().where(Wishlist.item_id==item.id)
    # wishlistDelete.execute()
    # breakpoint()
    delete= Favorite.delete().where(Favorite.user == id , Favorite.chef == id_owner)
    delete.execute()
    # breakpoint()
    return jsonify({"msg":"you removing is successful"}),200



    # id_owner = request.json.get('id_owner', None)
    # id = get_jwt_identity()

    # favorite = Favorite(
    #     user= id,
    #     chef=  id_owner
    # )
    
    # favorite.save()

    # return jsonify({
    #     "message": "Successfully make a new item.",
    #     "status": "success",
    #     "user": {
    #         "id": id,
    #     }
    # }), 200    
 

@favorite_api_blueprint.route('/show', methods=['GET'])
@jwt_required
def index():
    id = get_jwt_identity()
    # user = User.get_or_none(User.id == id)
    # user_id = user.id
    # recipes = Recipe.select().where(Recipe.user_id == id)
    recipes= Recipe.select().join(Favorite, on=Favorite.chef_id == Recipe.user_id).where(Favorite.user_id == id)

    # recipes = Recipe.select().where(Favorite.user_id == id)

    
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
            "id_owner": recipe.user.id,
            "user_photo": recipe.user.photo
        } for recipe in recipes]
    }), 200