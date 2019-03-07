from django.urls import include, path
from rest_framework import routers
from api_v1 import views

router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)
router.register(r'seat', views.SeatViewSet)
router.register(r'show', views.ShowViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'hall', views.HallViewSet)
router.register(r'sale', views.SaleViewSet)
router.register(r'ticket', views.TicketViewSet)
router.register(r'booking', views.BookingViewSet)


app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]