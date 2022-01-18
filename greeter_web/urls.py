from django.urls import path
from .views import Greeter, NamesListView

urlpatterns = [
    path('', Greeter.as_view(), name='say_hello'),
    path('names/', NamesListView.as_view(), name='names_list')
    # path('names/',NamesListView.as_view(),name='names_list')
]