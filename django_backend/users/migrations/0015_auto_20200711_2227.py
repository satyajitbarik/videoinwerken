# Generated by Django 2.2.13 on 2020-07-11 20:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20200711_2220'),
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
    ]
