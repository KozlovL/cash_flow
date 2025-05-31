# Cash flow API

## Описание

**Cash flow** — REST API для управления доходами и расходами.


## Автор
👨‍💻 **Козлов Леонид**  
📧 [GitHub](https://github.com/KozlovL) 


## Технологический стек
### Backend
- Python 3.9
- Django 4.2
- Django REST Framework
- Sqlite3

### Frontend
- React
- Bootstrap

### Инфраструктура
- Docker Compose

## Локальное развертывание с Docker compose

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/KozlovL/cash_flow.git
```
```bash
cd cash_flow
```

2. **Запустите проект в Docker-контейнерах**
```bash
docker compose up --build -d
```

3. **Создание суперпользователя**
```bash
docker compose exec backend python manage.py createsuperuser
```

4. **Запуск проекта**

Проект доступен по адресу:  
**http://localhost:3000**

Админ-зона доступна по адресу:
**http://localhost:8000/admin**

API доступен по адресу:
**http://localhost:8000/api**

Документация доступна по ссылке:
[Просмотреть API документацию в Swagger Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/твой-KozlovL/cash_flow/master/backend/schema.yaml)

## Примеры API-запросов

**Получить список записей**
```bash
GET http://localhost:8000/api/records/
```

**Создать новую запись**
```bash
POST http://localhost:8000/api/records/
Content-Type: application/json
{
  "type": "Доход",
  "status": "Опубликовано",
  "category": "Зарплата",
  "subcategory": "Оклад",
  "amount": 1000,
  "pub_date": "01.01.2025",
  "comment": "Запись по номером 1"
}
```

**Обновить запись**
```bash
PATCH http://localhost:8000/api/records/<id>/
Content-Type: application/json
{
  "type": "Доход",
  "status": "Опубликовано",
  "category": "Зарплата",
  "subcategory": "Оклад",
  "amount": 1000,
  "pub_date": "01.01.2025",
  "comment": "Запись по номером 1"
}
```

**Удалить запись**
```bash
DELETE http://localhost:8000/api/records/<id>/
```