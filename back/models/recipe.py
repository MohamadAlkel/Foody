from models.base_model import BaseModel
import peewee as pw
from models.user import User



class Recipe(BaseModel):
    name = pw.CharField(unique=True)
    photo = pw.CharField(null=True)
    location = pw.CharField(unique=True)
    ingred = pw.CharField(null=True)
    direction = pw.CharField(null=True, default='what do you do?')
    user = pw.ForeignKeyField(User, backref="user")
    hour = pw.IntegerField(null=True)
    sec =  pw.IntegerField(null=True)