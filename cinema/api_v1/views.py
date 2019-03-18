from webapp.models import Movie, Category, Hall, Seat, Show, Sale, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieDisplaySerializer, MovieCreateSerializer, HallSerializer, CategorySerializer, SeatSerializer, ShowSerializer, SaleSerializer, \
    TicketSerializer, BookingSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []

class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.order_by('id')
    filterset_fields = ('id',)


    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

class HallViewSet(NoAuthModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer

class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = self.queryset
        movie_id = self.request.query_params.get('movie_id', None)
        hall_id = self.request.query_params.get('hall_id', None)
        starts_after = self.request.query_params.get('starts_after', None)
        starts_before = self.request.query_params.get('starts_before', None)

        if movie_id:
            queryset = queryset.filter(movie_id=movie_id)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
        if starts_after:
            queryset = queryset.filter(start_datetime__gte=starts_after)
        if starts_before:
            queryset = queryset.filter(start_datetime__lte=starts_before)
        return queryset

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



