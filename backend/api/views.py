from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    A simple endpoint to test the API is working.
    """
    return Response({
        "message": "Welcome to the API!",
        "status": "OK"
    })
