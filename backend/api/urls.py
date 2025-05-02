from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    
    # Test card routes (matching frontend api.js)
    path('test-card/', views.get_random_test_card, name='get_random_test_card'),
    path('test-result/', views.submit_test_result, name='submit_test_result'),
] 