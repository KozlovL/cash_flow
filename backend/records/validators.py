from django.core.exceptions import ValidationError
from django.utils import timezone


def validate_pub_date(pub_date):
    # Проверка, что дата публикации не из будущего.
    if pub_date > timezone.now().date():
        raise ValidationError(
            'Дата публикации не может быть из будущего.'
        )
