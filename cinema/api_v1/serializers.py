from rest_framework.exceptions import ValidationError
from webapp.models import Movie, Hall, Show, Seat, Category, Sale, Ticket, Booking, RegistrationToken
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



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


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    # чтобы email был обязательным
    email = serializers.EmailField(required=True)

    # общая валидация между разными полями может происходить в методе validate
    # attrs - словарь со всеми данными для модели, уже проверенными по отдельности.
    # ошибки из этого метода попадают в non_field_errors.
    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise ValidationError("Passwords do not match")
        return super().validate(attrs)

    def create(self, validated_data):
        # удаляем подтверждение пароля из списка атрибутов
        validated_data.pop('password_confirm')
        # удаляем пароль из списка атрибутов и запоминаем его
        password = validated_data.pop('password')
        # создаём пользователя со всеми оставшимися данными
        user = super().create(validated_data)
        # выставляем пароль для пользователя
        user.set_password(password)
        # чтобы новый пользователь был неактивным
        user.is_active = False
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'password_confirm', 'email']


class UserSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:user-detail')
    # имя пользователя нельзя менять.
    username = serializers.CharField(read_only=True)
    # пароль нельзя смотреть.
    # поле пароль здесь нужно для проверки, что пользователь - тот, за кого себя выдаёт,
    # при редактировании остальных данных.
    password = serializers.CharField(write_only=True)
    # новый пароль и его подтверждение - только для записи, необязательные
    # на случай, если пользователь не хочет менять пароль.
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password_confirm = serializers.CharField(write_only=True, required=False, allow_blank=True)
    email = serializers.EmailField(required=True, allow_blank=False)

    # метод для валидации поля "Пароль"
    # value - это пароль
    def validate_password(self, value):
        user = self.context['request'].user
        if not authenticate(username=user.username, password=value):
            raise ValidationError('Invalid password for your account')
        return value

    def validate(self, attrs):
        if attrs.get('new_password') != attrs.get('new_password_confirm'):
            raise ValidationError("Passwords do not match")
        return super().validate(attrs)

    # user - это instance
    def update(self, instance, validated_data):
        # удаляем старый пароль из списка атрибутов
        validated_data.pop('password')
        # удаляем новый пароль из списка атрибутов и запоминаем его
        new_password = validated_data.pop('new_password')
        # удаляем подтверждение пароля из списка атрибутов
        validated_data.pop('new_password_confirm')

        # обновляем пользователя всеми оставшимися данными
        instance = super().update(instance, validated_data)

        # меняем пароль при необходимости
        if new_password:
            instance.set_password(new_password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'first_name', 'last_name', 'email',
                  'password', 'new_password', 'new_password_confirm']



# сериализатор для формы отправки токена,
# принимает токен и проверяет, что он - uuid.
# т.к. не нужен для создания/обновления/получения списка и т.д.
# не связываем его с моделью, а используем базовый Serializer с одним полем.
class RegistrationTokenSerializer(serializers.Serializer):
    token = serializers.UUIDField(write_only=True)

    # валидация поля token.
    # теперь проверки на существование и срок действия токена
    # выполняются здесь вместо представления UserActivateView.
    # метод называется validate_token, потому что сериализаторы DRF для
    # дополнительной валидации своих полей ищут методы с именами вида
    # validate_field, где field - имя этого поля в сериализаторе.
    def validate_token(self, token_value):
        try:
            token = RegistrationToken.objects.get(token=token_value)
            if token.is_expired():
                raise ValidationError("Token expired")
            return token
        except RegistrationToken.DoesNotExist:
            raise ValidationError("Token does not exist or already used")