from django.contrib import admin
from records.models import Record, Type, Status, Category, Subcategory


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = (
        'pub_date',
        'status',
        'type',
        'amount',
        'category',
        'get_subcategories',
        'comment',
    )
    search_fields = (
        'status__name',
        'type__name',
        'category__name',
        'subcategory__name',
        'amount',
    )
    list_filter = (
        'status__name',
        'type__name',
        'category__name',
        'subcategory__name',
    )
    empty_value_display = '-пусто-'

    @admin.display(description='Подкатегории')
    def get_subcategories(self, obj):
        return ", ".join(
            [subcategory.name for subcategory in obj.subcategory.all()]
        )


@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )
    search_fields = (
        'name',
    )
    list_filter = (
        'name',
    )
    empty_value_display = '-пусто-'


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )
    search_fields = (
        'name',
    )
    list_filter = (
        'name',
    )
    empty_value_display = '-пусто-'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'type',
    )
    search_fields = (
        'name',
        'type__name',
    )
    list_filter = (
        'name',
        'type',
    )
    empty_value_display = '-пусто-'


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
    )
    search_fields = (
        'name',
        'category__name',
    )
    list_filter = (
        'name',
        'category',
    )
    empty_value_display = '-пусто-'
