from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from api.filters import RecordFilterSet, SubcategoryFilterSet, CategoryFilterSet
from api.serializers import (
    RecordSerializer, TypeSerializer,
    StatusSerializer, SubcategorySerializer, CategorySerializer,
)
from records.models import Record, Type, Category, Status, Subcategory


class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    ordering = ('-pub_date',)
    lookup_field = 'id'
    http_method_names = ['get', 'post', 'patch', 'delete']
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RecordFilterSet


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    ordering = ('name',)
    lookup_field = 'id'
    http_method_names = ['get', 'post', 'patch', 'delete']
    pagination_class = PageNumberPagination


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    ordering = ('name',)
    lookup_field = 'id'
    http_method_names = ['get', 'post', 'patch', 'delete']
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoryFilterSet


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    ordering = ('name',)
    lookup_field = 'id'
    http_method_names = ['get', 'post', 'patch', 'delete']
    pagination_class = PageNumberPagination


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
    ordering = ('name',)
    lookup_field = 'id'
    http_method_names = ['get', 'post', 'patch', 'delete']
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = SubcategoryFilterSet
