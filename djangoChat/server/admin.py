from django.contrib import admin
from .models import Channel, Server, Category

admin.site.register(Channel)
admin.site.register(Category)


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner',
                    'category', 'description']
    list_editable = ['name']
    search_fields = ['name']

    list_display_links = None

    def __str__(self):
        return self.title
