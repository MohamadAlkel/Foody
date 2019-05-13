import peeweedbevolve
from flask import Flask
from models.base_model import db
from models.user import User
from models.recipe import Recipe
from models.favorite import Favorite
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS
from flask import Blueprint, render_template, request, redirect, url_for, flash, Flask,send_from_directory





app = Flask(__name__, static_folder='build/static')
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['JWT_SECRET_KEY'] = 'super-secret'  
jwt = JWTManager(app)


from foody_api.blueprints.user.views import users_api_blueprint
app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')

from foody_api.blueprints.recipe.views import recipe_api_blueprint
app.register_blueprint(recipe_api_blueprint, url_prefix='/api/v1/recipe')

from foody_api.blueprints.favorite.views import favorite_api_blueprint
app.register_blueprint(favorite_api_blueprint, url_prefix='/api/v1/favorite')



@app.before_request 
def before_request():
    db.connect()

@app.after_request 
def after_request(response):
    db.close()
    return response

@app.cli.command() 
def migrate(): 
   db.evolve(ignore_tables={'base_model'})   

@app.route("/")
@app.route("/<path:path>")
def root(path=None):
    return render_template("index.html")

# @app.route('/user/<username>')
# def show(username):
#     return f"Hi {username}"    

if __name__ == '__main__': 
   app.run(debug=True)