from rest_framework import serializers
from models import Waypoint, Image

class WaypointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waypoint
        fields = ('id', 'latitude', 'longitude', 'create_dt', 'update_dt')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'embed_link', 'description', 'waypoint', 'create_dt', 'update_dt')
