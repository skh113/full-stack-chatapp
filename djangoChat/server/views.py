from django.http import Http404
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response

from .models import Server
from .serializer import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")

        # the order of these statements matter!
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user and not request.user.is_authenticated:
            raise AuthenticationFailed()
        else:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        if by_server_id:
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise Http404
            except ValueError:
                raise ValidationError(detail="Value Error! the type should be int.")

        if qty:
            self.queryset = self.queryset[: int(qty)]

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
