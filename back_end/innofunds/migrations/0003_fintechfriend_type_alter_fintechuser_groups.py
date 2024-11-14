# Generated by Django 5.0.1 on 2024-11-14 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('innofunds', '0002_alter_fintechuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='fintechfriend',
            name='type',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='fintechuser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
    ]
