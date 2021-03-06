# Generated by Django 2.1.7 on 2019-03-06 16:10

from django.db import migrations, models
import django.db.models.deletion
import webapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0002_auto_20190303_1639'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=webapp.models.generate_code, max_length=12, unique_for_date='created_at')),
                ('status', models.CharField(choices=[('Создано', 'Создано'), ('Выкуплено', 'Выкуплено'), ('Отмена', 'Отмена')], max_length=20, verbose_name='Статус')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Время создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Время изменения')),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название скидки')),
                ('how', models.DecimalField(decimal_places=2, max_digits=10)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('finish_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('go_back', models.BooleanField(default=False)),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticket', to='webapp.Sale', verbose_name='Скидка')),
            ],
        ),
        migrations.AlterField(
            model_name='movie',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='movie', to='webapp.Category', verbose_name='Жанр'),
        ),
        migrations.AlterField(
            model_name='seat',
            name='hall',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='seat', to='webapp.Hall', verbose_name='Название зала'),
        ),
        migrations.AlterField(
            model_name='show',
            name='hall',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='show', to='webapp.Hall', verbose_name='Название зала'),
        ),
        migrations.AlterField(
            model_name='show',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='show', to='webapp.Movie', verbose_name='Название фильма'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='seat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticket', to='webapp.Seat', verbose_name='Место'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='show',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticket', to='webapp.Show', verbose_name='Сеанс'),
        ),
        migrations.AddField(
            model_name='booking',
            name='seat',
            field=models.ManyToManyField(related_name='booking', to='webapp.Seat', verbose_name='Место'),
        ),
        migrations.AddField(
            model_name='booking',
            name='show',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='booking', to='webapp.Show', verbose_name='Сеанс'),
        ),
    ]
