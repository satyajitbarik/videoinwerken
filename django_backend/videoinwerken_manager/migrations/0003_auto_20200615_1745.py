# Generated by Django 2.2.13 on 2020-06-15 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoinwerken_manager', '0002_auto_20200615_1148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_duration',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
