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



favorite_api_blueprint = Blueprint('favorite_api',
                                __name__,
                                template_folder='templates')


@favorite_api_blueprint.route('/', methods=['GET'])
def createi():
    return '<h1>lol</h1>'



 
