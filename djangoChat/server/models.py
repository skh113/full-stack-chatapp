from typing import Iterable, Optional

from django.conf import settings
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from .validators import validate_icon_image_size, validate_image_file_extensions

NAME_MAX_LENGTH = 100


# FIXME: whenever a new obj is created instance.id is not set, so the images uploads to None folder.
def get_channel_banner_upload_path(instance, filename) -> str:
    return f"channel/{instance.id}/channel_banner/{filename}"


def get_channel_icon_upload_path(instance, filename) -> str:
    return f"channel/{instance.id}/channel_icon/{filename}"


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

    @receiver(models.signals.pre_delete, sender="server.Category")
    def on_delete_category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

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
    banner = models.ImageField(upload_to=get_channel_banner_upload_path, null=True, blank=True,
                               validators=[validate_image_file_extensions])
    icon = models.ImageField(upload_to=get_channel_icon_upload_path, null=True, blank=True,
                             validators=[validate_icon_image_size, validate_image_file_extensions])

    # FIXME: needs refactoring
    # delete previous icon if a new one is uploaded
    def save(self, *args, **kwargs) -> None:
        if self.id:
            existing = get_object_or_404(Channel, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
            if existing.banner != self.banner:
                existing.banner.delete(save=False)

        super(Channel, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Channel")
    def on_delete_channel_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon" or field.name == "banner":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name
