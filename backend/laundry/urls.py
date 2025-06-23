from django.urls import path
from .views import create_laundry_request

urlpatterns = [
    path('pickup/', create_laundry_request, name='create-laundry-request'),
]
