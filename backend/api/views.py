from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import random
from .models import TestCard, TestResult
from .serializers import TestCardSerializer, TestResultSerializer

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

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_test_cards(request):
    """
    Get all test cards
    """
    cards = TestCard.objects.all()
    serializer = TestCardSerializer(cards, many=True)
    print('Sending cards with image URLs:', [{'id': card.id, 'image_url': card.image_url} for card in cards])
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_random_test_card(request):
    """
    Get a random test card. 
    If card_number is provided, return that specific card.
    """
    card_number = request.query_params.get('card_number')
    
    if card_number:
        try:
            # Get specific card by number
            card = get_object_or_404(TestCard, card_number=int(card_number))
        except ValueError:
            return Response(
                {"error": "Invalid card number"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        # Get all cards and select a random one
        cards = TestCard.objects.all()
        if not cards.exists():
            return Response(
                {"error": "No test cards available"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        card = random.choice(cards)
    
    serializer = TestCardSerializer(card)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_test_result(request):
    """
    Submit a test result for a card
    """
    # Get data from request
    card_id = request.data.get('card_id')
    user_id = request.data.get('user_id', 'anonymous')
    selected_option = request.data.get('selected_option')
    
    # Validate data
    if not card_id:
        return Response(
            {"error": "Card ID is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if selected_option is None:
        return Response(
            {"error": "Selected option is required"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Get the card
        card = TestCard.objects.get(id=card_id)
        
        # Create test result
        result_data = {
            'card': card,
            'user_id': user_id,
            'selected_option': selected_option
        }
        
        serializer = TestResultSerializer(data={
            'card': card.id,
            'user_id': user_id,
            'selected_option': selected_option
        })
        
        if serializer.is_valid():
            result = TestResult.objects.create(**result_data)
            is_correct = (selected_option == card.correct_answer)
            
            # Get a new random card
            next_card = None
            other_cards = TestCard.objects.exclude(id=card.id)
            if other_cards.exists():
                next_card = random.choice(other_cards)
                next_card_data = TestCardSerializer(next_card).data
            else:
                next_card_data = None
            
            return Response({
                "success": True,
                "is_correct": is_correct,
                "message": "Test result submitted successfully",
                "next_card": next_card_data
            })
        else:
            return Response(
                {"error": serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except TestCard.DoesNotExist:
        return Response(
            {"error": "Card not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
