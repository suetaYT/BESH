from rest_framework import serializers
from .models import TestCard, TestResult

class TestCardSerializer(serializers.ModelSerializer):
    """
    Serializer for TestCard model
    """
    class Meta:
        model = TestCard
        fields = ['id', 'card_number', 'question', 'option_1', 'option_2', 
                  'option_3', 'option_4', 'correct_answer', 'image_url']

class TestResultSerializer(serializers.ModelSerializer):
    """
    Serializer for TestResult model
    """
    class Meta:
        model = TestResult
        fields = ['id', 'card', 'user_id', 'is_correct', 'selected_option', 'timestamp']
        
    def create(self, validated_data):
        """
        Create and return a new TestResult instance
        """
        card = validated_data.get('card')
        selected_option = validated_data.get('selected_option')
        
        # Check if the selected answer is correct
        is_correct = (selected_option == card.correct_answer)
        validated_data['is_correct'] = is_correct
        
        return TestResult.objects.create(**validated_data) 