from django.db import models
import random
import string
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    categories = models.ManyToManyField('Category', related_name="movie", blank=True, verbose_name="Жанр")


    def __str__(self):
        return self.name



class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Жанр")
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name="Описание жанра")

    def __str__(self):
        return self.name


class Hall(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название зала")

    def __str__(self):
        return self.name


class Seat(models.Model):
    hall = models.ForeignKey(Hall, related_name="seat", verbose_name="Название зала", on_delete=models.PROTECT)
    row = models.CharField(max_length=15, verbose_name="Номер ряда")
    place = models.CharField(max_length=15, verbose_name="Номер места")

    def __str__(self):
        return "%s - %s ряд  %s место" % (self.hall, self.row, self.place)

class Show(models.Model):
    movie = models.ForeignKey(Movie, related_name="show", verbose_name="Название фильма", on_delete=models.PROTECT)
    hall = models.ForeignKey(Hall, related_name="show", verbose_name="Название зала", on_delete=models.PROTECT)
    start_datetime = models.DateTimeField()
    finish_datetime = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "%s - %s, Сеанс в (%s) - %s сом" % (self.movie, self.hall, self.start_datetime.strftime('%d.%m.%Y %H:%M'), self.price)

class Sale(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название скидки")
    how = models.DecimalField(max_digits=4, decimal_places=2)
    start_date = models.DateField(null=True, blank=True)
    finish_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return "%s - %s" % (self.name, self.how)


class Ticket(models.Model):
    show = models.ForeignKey(Show, related_name="ticket", verbose_name="Сеанс", on_delete=models.PROTECT)
    seat = models.ForeignKey(Seat, related_name="ticket", verbose_name="Место", on_delete=models.PROTECT)
    sale = models.ForeignKey(Sale, related_name="ticket", verbose_name="Скидка", on_delete=models.PROTECT, blank=True, null=True)
    go_back = models.BooleanField(default=False)

    def __str__(self):
        return "%s, Ряд: %s, Место: %s, Скидка: %s" % (self.show, self.seat.row, self.seat.place, self.sale)


def generate_code():
    code = ""
    for i in range(0, settings.BOOKING_CODE_LENGHT):
        code += random.choice(string.digits)
    return code

class Booking(models.Model):

    STATUS_CREATED = 'Создано'
    STATUS_REDEEMED = 'Выкуплено'
    STATUS_CANCELLATION = 'Отмена'

    STATUS_CHOICES = (
        (STATUS_CREATED, 'Создано'),
        (STATUS_REDEEMED, 'Выкуплено'),
        (STATUS_CANCELLATION, 'Отмена')
    )

    code = models.CharField(max_length=12, unique_for_date='created_at', default=generate_code, editable=False)
    show = models.ForeignKey(Show, related_name="booking", verbose_name="Сеанс", on_delete=models.PROTECT)
    seat = models.ManyToManyField(Seat, related_name="booking", verbose_name="Место")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, verbose_name="Статус")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Время изменения")


    def __str__(self):
        return "%s, %s в %s" % (self.show, self.status, self.created_at.strftime('%d.%m.%Y %H:%M'))