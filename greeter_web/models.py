from django.db import models
from django.contrib.postgres.indexes import HashIndex

# Create your models here.


class Name(models.Model):
    email = models.EmailField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)

    class Meta:
        indexes = (HashIndex(fields=('email',)),)
