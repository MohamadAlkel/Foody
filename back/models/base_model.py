import os
import peewee as pw
import datetime
from playhouse.postgres_ext import PostgresqlExtDatabase

db = PostgresqlExtDatabase('foody_dev', user="TOSHIBA", password="123")

class BaseModel(pw.Model):
   created_at = pw.DateTimeField(default=datetime.datetime.now)
   updated_at = pw.DateTimeField(default=datetime.datetime.now)

   def save(self, *args, **kwargs):
       self.updated_at = datetime.datetime.now()
       return super(BaseModel, self).save(*args, **kwargs)

   class Meta:
       database = db
       legacy_table_names = False


       