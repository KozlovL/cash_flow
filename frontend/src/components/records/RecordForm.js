import React, { useEffect, useState } from 'react';
import {
  fetchTypes,
  fetchCategoriesByTypeName,
  fetchSubcategoriesByCategoryName,
  fetchStatuses,
  createRecord,
  updateRecord,
} from '../../api';

function RecordForm({ record, onClose }) {
  const isEdit = Boolean(record);

  const [formData, setFormData] = useState({
    pub_date: '',
    status: '',
    type: '',
    category: '',
    subcategory: [],
    amount: '',
    comment: '',
  });

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Загрузка справочников типов и статусов
  useEffect(() => {
    fetchTypes().then((data) => setTypes(data.results || data));
    fetchStatuses().then((data) => setStatuses(data.results || data));
  }, []);

  const formatDateForBackend = (isoDate) => {
    const [yyyy, mm, dd] = isoDate.split('-');
    return `${dd}.${mm}.${yyyy}`;
  };

  const getTodayFormatted = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };



  // Инициализация данных при редактировании
  useEffect(() => {
    if (!isEdit) return;

    const loadData = async () => {
      try {
        // Сразу устанавливаем поля из record (включая category и subcategory)
        setFormData({
          pub_date: record.pub_date || '',
          status: record.status || '',
          type: record.type || '',
          category: record.category || '',
          subcategory: Array.isArray(record.subcategory) ? record.subcategory : [],
          amount: record.amount || '',
          comment: record.comment || '',
        });

        // Загружаем категории по типу
        const fetchedCategories = await fetchCategoriesByTypeName(record.type);
        setCategories(fetchedCategories.results || fetchedCategories);

        // Загружаем подкатегории по категории
        if (record.category) {
          const fetchedSubcategories = await fetchSubcategoriesByCategoryName(record.category);
          setSubcategories(fetchedSubcategories.results || fetchedSubcategories);
        } else {
          setSubcategories([]);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных для редактирования', error);
      }
    };

    loadData();
  }, [isEdit, record]);

  // При смене типа — загружаем категории (без сброса formData.category и subcategory)
  useEffect(() => {
    if (formData.type) {
      fetchCategoriesByTypeName(formData.type).then((data) => {
        setCategories(data.results || data);
      });
    } else {
      setCategories([]);
      setSubcategories([]);
    }
  }, [formData.type]);

  // При смене категории — загружаем подкатегории (без сброса formData.subcategory)
  useEffect(() => {
    if (formData.category) {
      fetchSubcategoriesByCategoryName(formData.category).then((data) => {
        setSubcategories(data.results || data);
      });
    } else {
      setSubcategories([]);
    }
  }, [formData.category]);

  // Обработка изменения поля в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // При смене типа сбрасываем category и subcategory
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: '',
      subcategory: [],
    }));
  };

  // При смене категории сбрасываем subcategory
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      subcategory: [],
    }));
  };

  // Обработка выбора подкатегорий (множественный выбор)
  const handleSubcategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setFormData((prev) => ({ ...prev, subcategory: selected }));
  };

  // Отправка формы
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.subcategory.length) {
    alert('Выберите хотя бы одну подкатегорию');
    return;
  }

  const preparedData = {
    ...formData,
    pub_date: formData.pub_date ? formatDateForBackend(formData.pub_date) : getTodayFormatted(),
  };

  try {
    if (isEdit) {
      await updateRecord(record.id, preparedData);
    } else {
      await createRecord(preparedData);
    }
    onClose();
  } catch (error) {
    console.error('Ошибка при сохранении записи:', error);
    alert('Не удалось сохранить запись. Проверьте данные.');
  }
};


  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label className="form-label">Тип</label>
        <select
          value={formData.type}
          onChange={handleTypeChange}
          className="form-select"
          required
        >
          <option value="">Выберите тип</option>
          {types.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label">Категория</label>
        <select
          value={formData.category}
          onChange={handleCategoryChange}
          className="form-select"
          disabled={!formData.type}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <label className="form-label">Подкатегории</label>
        <select
          multiple
          value={formData.subcategory}
          onChange={handleSubcategoryChange}
          className="form-select"
          disabled={!formData.category}
          required
        >
          {subcategories.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="form-text text-muted">
          Для выбора нескольких подкатегорий зажмите <strong>Ctrl</strong> (или <strong>Cmd</strong> на Mac)
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label">Дата</label>
        <input
          type="date"
          name="pub_date"
          value={formData.pub_date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Статус</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Выберите статус</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Сумма</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-12">
        <label className="form-label">Комментарий</label>
        <input
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-12 d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Сохранить изменения' : 'Создать запись'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
}

export default RecordForm;
