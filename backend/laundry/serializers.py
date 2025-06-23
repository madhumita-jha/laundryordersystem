from rest_framework import serializers # type: ignore
from .models import LaundryOrder

class LaundryOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaundryOrder
        fields = '__all__'
