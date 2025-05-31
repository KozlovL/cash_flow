from datetime import date

from django.core.validators import MinValueValidator
from django.db import models

from records.constants import (
    NAME_MAX_LENGTH, NAME_WIDTH, AMOUNT_MIN_VALUE,
    TEXT_WIDTH,
)
from records.validators import validate_pub_date


class NameModel(models.Model):
    """Абстрактная модель, обладающая полем name."""
    name = models.CharField(
        'Название',
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    class Meta:
        abstract = True
        ordering = ('name',)

    def __str__(self):
        return self.name[:NAME_WIDTH]


class Status(NameModel):

    class Meta(NameModel.Meta):
        verbose_name = 'Статус'
        verbose_name_plural = 'Статусы'
        default_related_name = 'statuses'


class Type(NameModel):

    class Meta(NameModel.Meta):
        verbose_name = 'Тип'
        verbose_name_plural = 'Типы'
        default_related_name = 'types'


class Category(NameModel):
    type = models.ForeignKey(
        Type,
        on_delete=models.CASCADE,
        verbose_name='Тип',
    )

    class Meta(NameModel.Meta):
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        default_related_name = 'categories'

    def __str__(self):
        return (
            f'Название - {self.name[:NAME_WIDTH]}. '
            f'Тип - {self.type}.'
        )


class Subcategory(NameModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name='Категория',
    )

    class Meta(NameModel.Meta):
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'
        default_related_name = 'subcategories'

    def __str__(self):
        return (
            f'Название - {self.name[:NAME_WIDTH]}. '
            f'Категория: {self.category}.'
        )


class Record(models.Model):
    pub_date = models.DateField(
        'Дата публикации',
        default=date.today,
        validators=[
            validate_pub_date,
        ]
    )

    status = models.ForeignKey(
        Status,
        on_delete=models.CASCADE,
        verbose_name='Статус',
    )

    type = models.ForeignKey(
        Type,
        on_delete=models.CASCADE,
        verbose_name='Тип',
    )

    amount = models.PositiveIntegerField(
        'Сумма',
        validators=[
            MinValueValidator(AMOUNT_MIN_VALUE),
        ]
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name='Категория',
    )

    subcategory = models.ManyToManyField(
        Subcategory,
        verbose_name='Подкатегории',
    )

    comment = models.TextField(
        'Комментарий',
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Записи'
        ordering = ('-pub_date',)
        default_related_name = 'records'

    def __str__(self):
        return (
            f'Дата публикации - {self.pub_date}. '
            f'Статус - {self.status}. '
            f'Тип - {self.type}. '
            f'Сумма - {self.amount} р. '
            f'Категория - {self.category}. '
            f'Комментарий - {self.comment[:TEXT_WIDTH]}.'
        )
