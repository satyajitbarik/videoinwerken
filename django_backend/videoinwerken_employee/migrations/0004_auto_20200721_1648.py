# Generated by Django 2.2.13 on 2020-07-21 14:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('videoinwerken_employee', '0003_auto_20200721_1647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeequestion',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='videoinwerken_manager.CourseQuestion'),
        ),
    ]
