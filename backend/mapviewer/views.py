from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import APIException
from .serializers import UserSerializer, WaypointSerializer, ImageSerializer
from .models import User, Waypoint, Image


# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        # Custom logic to filter tasks
        queryset = User.objects.all()
        user_username = self.request.query_params.get('username')
        user_password = self.request.query_params.get('password')
        if user_username and user_password:
            return queryset.filter(username=user_username, password=user_password)
        return APIException(400)

class WaypointView(viewsets.ModelViewSet):
    serializer_class = WaypointSerializer
    queryset = Waypoint.objects.all()

    def get_queryset(self):
        # Custom logic to filter tasks
        queryset = Waypoint.objects.all()
        waypoint_user = self.request.query_params.get('user')
        if waypoint_user:
            return queryset.filter(user=waypoint_user)
        return queryset.filter(private=False)

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