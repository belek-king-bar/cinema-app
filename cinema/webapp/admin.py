from django.contrib import admin
from webapp.models import Movie, Category, Show, Hall, Seat, Sale, Ticket, Booking, RegistrationToken

# Register your models here.
class MovieAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'release_date']
    ordering = ['-release_date']
    search_fields = ['name', 'id']

class RegistrationTokenAdmin(admin.ModelAdmin):
    list_display = ['pk', 'user', 'created_at']
    readonly_fields = ['token']



admin.site.register(Movie, MovieAdmin)
admin.site.register(Category)
admin.site.register(Show)
admin.site.register(Seat)
admin.site.register(Hall)
admin.site.register(Sale)
admin.site.register(Ticket)
admin.site.register(Booking)
admin.site.register(RegistrationToken, RegistrationTokenAdmin)