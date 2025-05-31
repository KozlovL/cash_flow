from django_filters import rest_framework as django_filters

from records.models import Record, Status, Type, Category, Subcategory


class RecordFilterSet(django_filters.FilterSet):
    """
    Фильтрсет для записей. Позволяет фильтровать список записей по полям
    'pub_date', 'status', 'type', 'category', 'subcategory'.

    Пример фильтрации для 'pub_date':
    ?pub_date_before=01.01.2020&pub_date_after=01.01.2010
    выведет записи, в которых дата публикации находится в промежутке между
    01.01.2010 и 01.01.2020.

    Пример фильтрации для остальных полей (на примере поля 'status'):
    ?status=Status1&status=Status2&status=Status3
    выведет записи, в которых статус соответствует одному из трех параметров:
    Status1, Status2, Status3.
    """
    pub_date = django_filters.DateFromToRangeFilter()
    status = django_filters.ModelMultipleChoiceFilter(
        queryset=Status.objects.all(),
        field_name='status__name',  # Поле для фильтра
        to_field_name='name',  # Поле в модели
    )
    type = django_filters.ModelMultipleChoiceFilter(
        queryset=Type.objects.all(),
        field_name='type__name',
        to_field_name='name',
    )
    category = django_filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
        field_name='category__name',
        to_field_name='name',
    )
    subcategory = django_filters.ModelMultipleChoiceFilter(
        queryset=Subcategory.objects.all(),
        field_name='subcategory__name',
        to_field_name='name',
    )

    class Meta:
        model = Record
        fields = (
            'pub_date',
        )


class CategoryFilterSet(django_filters.FilterSet):
    type = django_filters.ModelMultipleChoiceFilter(
        queryset=Type.objects.all(),
        field_name='type__name',
        to_field_name='name',
    )

    class Meta:
        model = Category
        fields = ()


class SubcategoryFilterSet(django_filters.FilterSet):
    category = django_filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
        field_name='category__name',
        to_field_name='name',
    )

    class Meta:
        model = Subcategory
        fields = ()
