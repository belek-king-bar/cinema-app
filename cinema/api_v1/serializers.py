from webapp.models import Movie, Hall, Show, Seat, Category, Sale, Ticket, Booking
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('url', 'id', 'name', 'description')


class InlineSeatSerializer(serializers.ModelSerializer):
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', source='hall', read_only=True)

    class Meta:
        model = Seat
        fields = ('id', 'hall', 'hall_url', 'row', 'place')

class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


# Сериализатор фильмов для создания/обновления
# выводит категории по умолчанию - в виде списка id категорий
class MovieCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')

    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'categories')


# Сериализатор для просмотра фильмов
# выводит категории в виде списка вложенных объектов, представленных сериализатором InlineCategorySerializer.
class MovieDisplaySerializer(MovieCreateSerializer):
    categories = InlineCategorySerializer(many=True, read_only=True)


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')
    seat = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ('url', 'id', 'name', 'seat')


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', source='hall', read_only=True)

    class Meta:
        model = Seat
        fields = ('url', 'id', 'hall', 'hall_url')


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    movie_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', source='movie', read_only=True)
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', source='hall', read_only=True)
    hall_name = serializers.SerializerMethodField(read_only=True, source='hall')
    movie_name = serializers.SerializerMethodField(read_only=True, source='movie')

    # имя метода должно быть get_ + название поля (hall_name -> get_hall_name())
    # метод принимает один аргумент - сериализуемый объект (в данном случае - сеанс).
    def get_hall_name(self, show):
        return show.hall.name

    def get_movie_name(self, show):
        return show.movie.name

    class Meta:
        model = Show
        fields = ('url', 'id', 'movie', 'movie_url', 'hall', 'hall_url', 'start_datetime', 'finish_datetime', 'price',
                  'hall_name', 'movie_name')


class SaleSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:sale-detail')

    class Meta:
        model = Sale
        fields = ('url', 'id', 'name', 'how', 'start_date', 'finish_date')


class TicketSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:ticket-detail')
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', source='show', read_only=True)
    seat_url = serializers.HyperlinkedRelatedField(view_name='api_v1:seat-detail', source='seat', read_only=True)
    sale_url = serializers.HyperlinkedRelatedField(view_name='api_v1:sale-detail', source='sale', read_only=True)

    class Meta:
        model = Ticket
        fields = ('url', 'id', 'show', 'show_url', 'seat', 'seat_url', 'sale', 'sale_url', 'go_back')


class BookingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:booking-detail')
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', source='show', read_only=True)
    seat = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ('url', 'id', 'code', 'show', 'show_url', 'seat', 'status', 'created_at', 'updated_at')