# Generated by Django 2.2.13 on 2020-07-24 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20200724_0949'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_employee',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_employer',
            field=models.BooleanField(default=False),
        ),
    ]
