# Generated by Django 2.2.13 on 2020-07-23 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='iban',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
