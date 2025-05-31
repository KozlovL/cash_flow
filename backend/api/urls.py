from django.urls import include
from django.urls import path
from rest_framework import routers

from api.views import (
    RecordViewSet, TypeViewSet, StatusViewSet,
    CategoryViewSet, SubcategoryViewSet,
)

router = routers.DefaultRouter()
router.register('records', RecordViewSet, basename='record')
router.register('categories', CategoryViewSet, basename='category')
router.register('subcategories', SubcategoryViewSet, basename='subcategory')
router.register('statuses', StatusViewSet, basename='status')
router.register('types', TypeViewSet, basename='type')

urlpatterns = [
    path('', include(router.urls)),
]
