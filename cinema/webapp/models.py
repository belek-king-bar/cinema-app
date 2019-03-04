from django.db import models

# Create your models here.
class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    category = models.ManyToManyField('Category', related_name="category", blank=True, verbose_name="Жанр")


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
    hall = models.ForeignKey(Hall, related_name="sitting_hall", verbose_name="Название зала", on_delete=models.PROTECT)
    row = models.CharField(max_length=15, verbose_name="Номер ряда")
    place = models.CharField(max_length=15, verbose_name="Номер места")

    def __str__(self):
        return "%s - %s -> %s" % (self.hall, self.row, self.place)

class Show(models.Model):
    movie = models.ForeignKey(Movie, related_name="movie", verbose_name="Название фильма", on_delete=models.PROTECT)
    hall = models.ForeignKey(Hall, related_name="hall", verbose_name="Название зала", on_delete=models.PROTECT)
    start_datetime = models.DateTimeField()
    finish_datetime = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "%s - %s, %s - %s" % (self.movie, self.hall, self.start_datetime, self.price)


