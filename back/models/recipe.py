from models.base_model import BaseModel
import peewee as pw
from models.user import User



class Recipe(BaseModel):
    user = pw.ForeignKeyField(User, backref="user")
    name = pw.CharField(null=True)
    photo = pw.CharField(null=True)
    countrys = pw.CharField(null=True)
    ingredients = pw.TextField(null=True)
    directions = pw.TextField(null=True)
    hour = pw.IntegerField(null=True)
    sec =  pw.IntegerField(null=True)
    time =  pw.CharField(null=True)
    prep = pw.DecimalField(null=True)