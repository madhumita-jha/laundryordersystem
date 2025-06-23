from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import LaundryOrder
from .serializers import LaundryOrderSerializer

@api_view(['POST'])
def create_laundry_request(request):
    serializer = LaundryOrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
