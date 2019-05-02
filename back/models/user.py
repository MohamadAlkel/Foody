from models.base_model import BaseModel
import peewee as pw



class User(BaseModel):
    username = pw.CharField(unique=True)
    email = pw.CharField(unique=True)
    password = pw.CharField(null=True)
    photo = pw.CharField(default='profile-placeholder.jpg')
    work = pw.CharField(null=True, default='what do you do?')
    brief = pw.CharField(null=True, default='tell other users about your self, whats your hobby? how do you learn cooking.')
