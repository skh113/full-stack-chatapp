from typing import Iterable, Optional

from django.conf import settings
from django.db import models
from django.shortcuts import get_object_or_404

NAME_MAX_LENGTH = 100


def get_category_icon_upload_path(instance, filename) -> str:
    return f"category/{instance.id}/category_icon/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(
        upload_to=get_category_icon_upload_path,
        null=True,
        blank=True,
    )

    # delete previous icon if a new one is uploaded
    def save(self, *args, **kwargs) -> None:
        if self.id:
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)

        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="server_owner")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="server_category")
    description = models.CharField(max_length=250, null=True, blank=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="channel_owner")
    topic = models.CharField(max_length=NAME_MAX_LENGTH)
    server = models.ForeignKey(Server, on_delete=models.PROTECT, related_name="channel_server")

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
