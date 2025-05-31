from django import forms
from django.core.exceptions import ValidationError

from records.models import Record


class RecordForm(forms.ModelForm):

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

    def clean(self):
        """
        Проверяет, что категория принадлежит указанному типу, и подкатегории
        принадлежат указанной категории.

        Args:
            self

        Returns:
            dict: Очищенные данные формы.

        Raises:
            ValidationError: Если категория не принадлежит типу или
            подкатегория не принадлежит категории.
        """
        cleaned_data = super().clean()
        category = cleaned_data.get('category')
        subcategories = cleaned_data.get('subcategory')
        record_type = cleaned_data.get('type')
        if category and subcategories.exists():
            for subcategory in subcategories:
                if subcategory.category != category:
                    raise ValidationError(
                        f'Категория {category} не содержит подкатегорию '
                        f'{subcategory}.'
                    )
        if record_type and category:
            if record_type != category.type:
                raise ValidationError(
                    f'Тип {record_type} не содержит категорию '
                    f'{category}.'
                )
        return cleaned_data
