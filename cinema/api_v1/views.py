from webapp.models import Movie, Category, Hall, Seat, Show, Sale, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, HallSerializer, CategorySerializer, SeatSerializer, ShowSerializer, SaleSerializer, \
    TicketSerializer, BookingSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer

class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer

class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('start_datetime')
    serializer_class = ShowSerializer

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('how')
    serializer_class = SaleSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer



