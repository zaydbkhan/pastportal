from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WaypointSerializer, ImageSerializer
from .models import Waypoint, Image

# Create your views here.
class WaypointView(viewsets.ModelViewSet):
    serializer_class = WaypointSerializer
    queryset = Waypoint.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()