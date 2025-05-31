import React, { useEffect, useState } from 'react';
import {
  fetchTypes,
  fetchCategoriesByTypeName,
  fetchSubcategoriesByCategoryName,
  fetchStatuses,
} from '../../api';

function RecordFilters({ filters, setFilters }) {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data.results || data));
    fetchStatuses().then((data) => setStatuses(data.results || data));
  }, []);

  useEffect(() => {
    if (filters.type) {
      fetchCategoriesByTypeName(filters.type).then((data) =>
        setCategories(data.results || data)
      );
    } else {
      setCategories([]);
    }
    setFilters((prev) => ({ ...prev, category: '', subcategory: '' }));
  }, [filters.type]);

  useEffect(() => {
    if (filters.category) {
      fetchSubcategoriesByCategoryName(filters.category).then((data) =>
        setSubcategories(data.results || data)
      );
    } else {
      setSubcategories([]);
    }
    setFilters((prev) => ({ ...prev, subcategory: '' }));
  }, [filters.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-2">
        <label className="form-label">Тип</label>
        <select
          name="type"
          value={filters.type || ''}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Все</option>
          {types.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">Категория</label>
        <select
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
          className="form-select"
          disabled={!filters.type}
        >
          <option value="">Все</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">Подкатегория</label>
        <select
          name="subcategory"
          value={filters.subcategory || ''}
          onChange={handleChange}
          className="form-select"
          disabled={!filters.category}
        >
          <option value="">Все</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">Статус</label>
        <select
          name="status"
          value={filters.status || ''}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Все</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <label className="form-label">Дата от</label>
        <input
          type="date"
          name="date_from"
          value={filters.date_from || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="col-md-2">
        <label className="form-label">Дата до</label>
        <input
          type="date"
          name="date_to"
          value={filters.date_to || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default RecordFilters;
