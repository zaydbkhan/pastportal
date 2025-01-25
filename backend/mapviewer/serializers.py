from rest_framework import serializers
from .models import User, Waypoint, Image

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'create_dt', 'update_dt')

class WaypointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waypoint
        fields = ('id', 'latitude', 'longitude', 'private', 'user', 'create_dt', 'update_dt')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'embed_link', 'description', 'private', 'user', 'waypoint', 'create_dt', 'update_dt')
