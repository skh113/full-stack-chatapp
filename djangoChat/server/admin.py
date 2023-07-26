from django.contrib import admin, messages
from .models import Channel, Server, Category

admin.site.register(Category)


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "owner", "topic", "server"]
    list_editable = ["name"]
    search_fields = ["name"]

    list_filter = ["server", "owner"]
    list_select_related = ["server"]
    ordering = ['id']


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    actions = ['clear_description']
    list_display = ["id", "name", "owner", "category", "description"]
    list_editable = ["name"]
    search_fields = ["name"]

    list_filter = ["category", "owner"]
    list_select_related = ["category"]
    list_per_page = 18
    ordering = ['id']

    @admin.action(description='Clear description')
    def clear_description(self, request, queryset):
        updated_count = queryset.update(description="-")
        self.message_user(
            request,
            f'{updated_count} servers were successfully updated.',
            messages.ERROR
        )

    def __str__(self):
        return str(self.id)
