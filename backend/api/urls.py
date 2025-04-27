from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('test-card/', views.get_random_test_card, name='get-random-test-card'),
    path('test-result/', views.submit_test_result, name='submit-test-result'),
] 