import peeweedbevolve
from flask import Flask
from models.base_model import db
from models.user import User
from models.recipe import Recipe

app = Flask(__name__)


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