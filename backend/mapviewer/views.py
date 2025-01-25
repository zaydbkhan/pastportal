from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import APIException
from .serializers import WaypointSerializer, ImageSerializer
from .models import Waypoint, Image

# Create your views here.
class WaypointView(viewsets.ModelViewSet):
    serializer_class = WaypointSerializer
    queryset = Waypoint.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def get_queryset(self):
        # Custom logic to filter tasks
        queryset = Image.objects.all()
        image_waypoint = self.request.query_params.get('waypoint')
        if image_waypoint:
            return queryset.filter(waypoint=image_waypoint)
        return APIException(code=400)