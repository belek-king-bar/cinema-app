from webapp.models import Movie, Hall, Show, Seat, Category
from rest_framework import serializers

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category')


class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = ('id', 'name')

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'hall', 'row', 'place')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')


class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('id', 'movie', 'hall', 'start_datetime', 'finish_datetime', 'price')
