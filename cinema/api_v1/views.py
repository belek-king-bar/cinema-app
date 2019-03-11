from django.views.decorators.csrf import csrf_exempt
from webapp.models import Movie, Category, Hall, Seat, Show, Sale, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieDisplaySerializer, MovieCreateSerializer, HallSerializer, CategorySerializer, SeatSerializer, ShowSerializer, SaleSerializer, \
    TicketSerializer, BookingSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []

class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.order_by('id')


    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer


class HallViewSet(NoAuthModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer

class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all().order_by('start_datetime')
    serializer_class = ShowSerializer

class SeatViewSet(NoAuthModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer

class CategoryViewSet(NoAuthModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SaleViewSet(NoAuthModelViewSet):
    queryset = Sale.objects.all().order_by('how')
    serializer_class = SaleSerializer

class TicketViewSet(NoAuthModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class BookingViewSet(NoAuthModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer



