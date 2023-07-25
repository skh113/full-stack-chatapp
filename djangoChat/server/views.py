from django.db.models import Count
from django.http import Http404
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from .models import Server
from .schema import list_server_docs
from .serializer import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    @list_server_docs
    def list(self, request):
        """
        Lists Server objects based on the provided query parameters.

        Args:

            request (django.http.HttpRequest): The HTTP request object containing query parameters.

        Returns:

            rest_framework.response.Response: A response containing a serialized list of Server objects.

        Raises:

            rest_framework.exceptions.AuthenticationFailed: If 'by_user' parameter is provided,
                but the user is not authenticated.

            rest_framework.exceptions.Http404: If 'by_server_id' parameter is provided,
                but no Server with the given ID exists.

            rest_framework.exceptions.ValidationError: If 'by_server_id' parameter is provided,
                but it is not a valid integer.

        Note:

            - 'category' parameter filters the results to include only Servers with the specified category name.
            - 'by_user' parameter filters the results to include only Servers owned by the authenticated user.
            - 'by_server_id' parameter filters the results to include only the Server with the given ID.
            - 'qty' parameter limits the number of Servers included in the response.


        The order of the filtering statements matter, with 'category', 'by_user', and 'by_server_id'
        taking precedence in that order.

        The response includes a serialized list of Server objects, each annotated with the 'member_num' field,
        representing the number of members for each Server.
        """

        # Extract query parameters from the request
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()

        if by_server_id:
            if not request.user.is_authenticated:
                raise AuthenticationFailed()

            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise Http404
            except ValueError:
                raise ValidationError(detail="Value Error! the type should be int.")

        # the order of this statement matter!
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # adding member number
        self.queryset = self.queryset.annotate(member_num=Count("member"))
        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
