from django.contrib import admin
from .models import Channel, Server, Category

admin.site.register(Channel)
admin.site.register(Category)


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "owner", "category", "description"]
    list_editable = ["name"]
    search_fields = ["name"]

    list_filter = ["category", "owner"]
    list_select_related = ["category"]
    list_per_page = 18
    ordering = ['id']

    def __str__(self):
        return str(self.id)
