from models.base_model import BaseModel
import peewee as pw



class User(BaseModel):
    username = pw.CharField(null=True)
    email = pw.CharField(null=True, unique=True)
    password = pw.CharField(null=True)
    photo = pw.CharField(null=True,default='https://storage.googleapis.com/foody-project/userImg.jpg')
    work = pw.CharField(null=True, default='what do you do?')
    brief = pw.CharField(null=True, default='tell other users about your self, whats your hobby? how do you learn cooking.')
