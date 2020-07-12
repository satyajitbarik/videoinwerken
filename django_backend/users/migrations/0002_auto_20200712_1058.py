# Generated by Django 2.2.13 on 2020-07-12 08:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='employees',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='is_employee',
        ),
        migrations.AddField(
            model_name='customuser',
            name='employer',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
