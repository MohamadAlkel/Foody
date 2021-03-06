from models.base_model import BaseModel
import peewee as pw
from models.user import User
from models.recipe import Recipe



class Favorite(BaseModel):
    # followers
    user = pw.ForeignKeyField(User, backref="user")
    # chef
    chef = pw.ForeignKeyField(User, backref="chef")

    