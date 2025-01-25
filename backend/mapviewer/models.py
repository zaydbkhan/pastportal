from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    create_dt = models.DateTimeField()
    update_dt = models.DateTimeField()

class Waypoint(models.Model):
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    private = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    create_dt = models.DateTimeField()
    update_dt = models.DateTimeField()

class Image(models.Model):
    embed_link = models.URLField()
    description = models.TextField()
    private = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    waypoint = models.ForeignKey(Waypoint, on_delete=models.CASCADE)
    create_dt = models.DateTimeField()
    update_dt = models.DateTimeField() # don't know if users will ever "update" an image, but leaving this here for good practice