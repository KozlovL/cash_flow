from django.core.validators import MinValueValidator
from rest_framework import serializers

from records.constants import AMOUNT_MIN_VALUE
from records.models import Record, Category, Subcategory, Type, Status


class TypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Type
        fields = (
            'id',
            'name',
        )
        read_only_fields = (
            'id',
        )


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = (
            'id',
            'name',
        )
        read_only_fields = (
            'id',
        )


class CategorySerializer(serializers.ModelSerializer):
    # Поле type будет представлено как строка (name связанного объекта Type)
    type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Type.objects.all(),
    )

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'type',
        )
        read_only_fields = (
            'id',
        )



class SubcategorySerializer(serializers.ModelSerializer):
    # Поле category будет представлено как строка (name связанного объекта
    # Category)
    category = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Category.objects.all(),
    )

    class Meta:
        model = Subcategory
        fields = (
            'id',
            'name',
            'category',
        )
        read_only_fields = (
            'id',
        )


class RecordSerializer(serializers.ModelSerializer):
    # Поле status будет представлено как строка (name связанного объекта
    # Status)
    status = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Status.objects.all(),
    )
    # Поле category будет представлено как строка (name связанного объекта
    # Category)
    category = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Category.objects.all(),
    )
    # Поле type будет представлено как строка (name связанного объекта
    # Type)
    type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Type.objects.all(),
    )
    # Поле subcategory будет представлено как строка (name связанного объекта
    # Subcategory)
    subcategory = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Subcategory.objects.all(),
        many=True,
    )
    # Валидация поля amount на положительность
    amount = serializers.IntegerField(
        validators=[MinValueValidator(AMOUNT_MIN_VALUE)],
    )

    class Meta:
        model = Record
        fields = (
            'id',
            'pub_date',
            'status',
            'type',
            'category',
            'subcategory',
            'amount',
            'comment',
        )
        read_only_fields = (
            'id',
        )

    def validate_category(self, category):
        """
        Проверяет, что категория принадлежит указанному типу.

        Args:
            category (Category): Категория

        Returns:
            Category: Валидная категория

        Raises:
            ValidationError: Если категория не принадлежит типу
        """
        # Получаем имя объекта Type из initial_data
        record_type_name = self.initial_data['type']
        # Проверяем соответствие категории типу
        if category.type.name != record_type_name:
            raise serializers.ValidationError(
                f'Тип {record_type_name} '
                f'не содержит категорию {category}.'
            )
        return category

    def validate_subcategory(self, subcategories):
        """
        Проверяет, что подкатегория принадлежит указанной категории.

        Args:
            subcategories (Subcategory): Список подкатегорий

        Returns:
            Subcategories: Валидные подкатегории

        Raises:
            ValidationError: Если подкатегория не принадлежит категории
        """
        # Получаем объект Category по имени в initial_data
        category_name = self.initial_data['category']
        category = Category.objects.get(
            name=category_name,
        )
        # Для каждой подкатегории проверяем соответствие с категорией
        for subcategory in subcategories:
            if subcategory.category != category:
                raise serializers.ValidationError(
                    f'Категория {category} '
                    f'не содержит подкатегорию {subcategory}.'
                )
        return subcategories
