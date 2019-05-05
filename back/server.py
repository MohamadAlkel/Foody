import peeweedbevolve
from flask import Flask
from models.base_model import db
from models.user import User
from models.recipe import Recipe
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS




app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['JWT_SECRET_KEY'] = 'super-secret'  
jwt = JWTManager(app)


from foody_api.blueprints.user.views import users_api_blueprint
app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')

from foody_api.blueprints.recipe.views import recipe_api_blueprint
app.register_blueprint(recipe_api_blueprint, url_prefix='/api/v1/recipe')

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
def index():
    return '<h1>Why so easy</h1>'

@app.route('/user/<username>')
def show(username):
    return f"Hi {username}"    

if __name__ == '__main__': 
   app.run(debug=True)