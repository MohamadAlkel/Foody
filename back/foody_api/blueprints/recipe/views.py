from flask import Blueprint, request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash
# from flask_jwt_extended import (
#     create_access_token,
#     get_jwt_identity,
#     jwt_required
# )
# from google.cloud import storage



recipe_api_blueprint = Blueprint('recipe_api',
                                __name__,
                                template_folder='templates')


@recipe_api_blueprint.route('/', methods=['GET'])
def createi():
    return '<h1>lol</h1>'