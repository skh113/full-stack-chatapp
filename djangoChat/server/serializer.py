from rest_framework import serializers

from .models import Server, Channel, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ServerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "icon"]


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    member_num = serializers.SerializerMethodField()
    category = ServerCategorySerializer()
    channel_server = ChannelSerializer(many=True)

    class Meta:
        model = Server
        exclude = ("member",)

    def get_member_num(self, obj) -> int:
        if hasattr(obj, "member_num"):
            return obj.member_num
        return 0
