# Generated by Django 2.2.13 on 2020-07-24 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200724_0947'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
    ]
