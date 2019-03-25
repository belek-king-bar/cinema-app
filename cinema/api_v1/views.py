from django.conf import settings
from webapp.models import Movie, Category, Hall, Seat, Show, Sale, Ticket, Booking, RegistrationToken
from rest_framework import viewsets, status
from api_v1.serializers import MovieDisplaySerializer, MovieCreateSerializer, HallSerializer, CategorySerializer, SeatSerializer, ShowSerializer, SaleSerializer, \
    TicketSerializer, BookingSerializer, UserSerializer, RegistrationTokenSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.generics import CreateAPIView, GenericAPIView, UpdateAPIView
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff
        })




class BaseViewSet(viewsets.ModelViewSet):
    # Метод, который отвечает за проверку разрешений на доступ к данному ViewSet
    def get_permissions(self):
        permissions = super().get_permissions()
        # IsAuthenticated - класс разрешения, требующий аутентификацию
        # добавляем его объект ( IsAuthenticated() ) к разрешениям только
        # для "опасных" методов - добавление, редактирование, удаление данных.
        if self.request.method in ["POST", "DELETE", "PUT", "PATCH"]:
            permissions.append(IsAuthenticated())
        return permissions


class MovieViewSet(BaseViewSet):
    queryset = Movie.objects.active().order_by('id')


    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class HallViewSet(BaseViewSet):
    queryset = Hall.objects.active().order_by('id')
    serializer_class = HallSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ShowViewSet(BaseViewSet):
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



class SeatViewSet(BaseViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer



class CategoryViewSet(BaseViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer



class SaleViewSet(BaseViewSet):
    queryset = Sale.objects.all().order_by('how')
    serializer_class = SaleSerializer



class TicketViewSet(BaseViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class BookingViewSet(BaseViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer


class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]



class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    # perform_create - встроенный метод CreateAPIView,
    # в котором выполняется сохранение нового ресурса в БД.
    # переопределяем его, чтобы добавить создание токена и отправку email
    def perform_create(self, serializer):
        # после создания пользователя
        user = serializer.save()
        # сохраняем токен
        token = self.create_token(user)
        # отправляем email
        self.send_registration_email(user, token)

    # токен достаточно создать в БД через свою модель
    def create_token(self, user):
        return RegistrationToken.objects.create(user=user)

    # генерируем url активации (HOST_URL - это ссылка на базовый URL фронтенда,
    # прописанный в settings.py или в settings_local.py) с токеном и вместе с
    # пояснительным текстом отправляем на email только что созданному пользователю.
    def send_registration_email(self, user, token):
        url = '%s/register/activate/?token=%s' % (settings.HOST_URL, token)
        email_text = "Your account was successfully created.\nPlease, follow the link to activate:\n\n%s" % url
        user.email_user("Registration at Cinema-App", email_text, settings.EMAIL_DEFAULT_FROM)


# Представление на базе GenericAPIView, которое принимает POST-запрос с токеном,
# десериализует его, получает токен и активирует пользователя, связанного с этим токеном.
# После активации токен удаляется, поэтому повторный запрос приводит к ошибке ObjectDoesNotExist,
# в результате обработки которой возвращается ответ 404.
class UserActivateView(GenericAPIView):
    serializer_class = RegistrationTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # активация пользователя
        user = self.perform_user_activation(serializer)
        # создание токена аутентификации и ответа, как в LoginView.
        auth_token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': auth_token.key,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'id': user.id,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff
        })

    # за активацию пользователя и удаление токена отвечает этот метод
    def perform_user_activation(self, serializer):
        token = serializer.validated_data.get('token')
        user = token.user
        user.is_active = True
        user.save()
        token.delete()
        return user

