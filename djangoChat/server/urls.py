from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("select", views.ServerListViewSet, basename="servers")
router.register("category", views.CategoryListViewSet, basename="categories")

urlpatterns = router.urls
