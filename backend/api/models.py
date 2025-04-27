from django.db import models

# Create your models here.

class TestCard(models.Model):
    """
    Model for test cards with questions and answers
    """
    card_number = models.IntegerField(unique=True, help_text="Unique card number")
    question = models.CharField(max_length=500)
    option_1 = models.CharField(max_length=255)
    option_2 = models.CharField(max_length=255)
    option_3 = models.CharField(max_length=255)
    option_4 = models.CharField(max_length=255)
    correct_answer = models.IntegerField(help_text="Index of correct answer (1-4)")
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Card #{self.card_number}: {self.question[:30]}..."
    
    class Meta:
        ordering = ['card_number']

class TestResult(models.Model):
    """
    Model for storing test results
    """
    card = models.ForeignKey(TestCard, on_delete=models.CASCADE, related_name='results')
    user_id = models.CharField(max_length=100, help_text="User identifier")
    is_correct = models.BooleanField(default=False)
    selected_option = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['card', 'user_id', 'timestamp']
        ordering = ['-timestamp']
    
    def __str__(self):
        result = "Correct" if self.is_correct else "Incorrect"
        return f"User {self.user_id} - Card #{self.card.card_number} - {result}"
