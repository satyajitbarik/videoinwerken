# Generated by Django 2.2.13 on 2020-06-15 09:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_auto_20200615_0940'),
        ('videoinwerken_manager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_duration',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='individual_result',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='course',
            name='manager',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user_profile.UserProfile'),
        ),
        migrations.AddField(
            model_name='course',
            name='video',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
