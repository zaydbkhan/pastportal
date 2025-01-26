"""
URL configuration for pastportal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pastportal.views import verify_email, return_location
from mapviewer.views import WaypointView, ImageView

router = routers.DefaultRouter()
router.register(r'waypoints', WaypointView, 'waypoint')
router.register(r'images', ImageView, 'image')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('verify_email/', verify_email, name='verify_email'),
    path('return_location/', return_location, name='return_location'),
]
