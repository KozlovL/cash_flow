import React, { useEffect, useState } from 'react';
import {
  fetchRecords,
  deleteRecord,
  fetchTypes,
  fetchCategoriesByTypeName,
  fetchSubcategoriesByCategoryName,
  fetchStatuses,
} from '../../api';
import RecordForm from './RecordForm';

function RecordList() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    subcategory: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => setTypes(data.results || data));
    fetchStatuses().then(data => setStatuses(data.results || data));
  }, []);

  useEffect(() => {
    fetchCategoriesByTypeName(filters.type).then(data => setCategories(data.results || data));
    // Сбрасываем выбранную категорию и подкатегорию при смене типа
    setFilters(prev => ({ ...prev, category: '', subcategory: '' }));
  }, [filters.type]);

  useEffect(() => {
    fetchSubcategoriesByCategoryName(filters.category).then(data => setSubcategories(data.results || data));
    // Сбрасываем выбранную подкатегорию при смене категории
    setFilters(prev => ({ ...prev, subcategory: '' }));
  }, [filters.category]);

  useEffect(() => {
    fetchRecords(filters).then(data => setRecords(data.results || data));
  }, [filters]);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteRecord(id).then(() => fetchRecords(filters).then(data => setRecords(data.results || data)));
  };

  const handleCreate = () => {
    setSelectedRecord(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchRecords(filters).then(data => setRecords(data.results || data));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Записи</h2>
      <button className="btn btn-success mb-3" onClick={handleCreate}>Создать запись</button>

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <label className="form-label">Тип</label>
          <select name="type" className="form-select" value={filters.type} onChange={handleFilterChange}>
            <option value="">Все</option>
            {types.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Категория</label>
          <select name="category" className="form-select" value={filters.category} onChange={handleFilterChange}>
            <option value="">Все</option>
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Подкатегория</label>
          <select name="subcategory" className="form-select" value={filters.subcategory} onChange={handleFilterChange}>
            <option value="">Все</option>
            {subcategories.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Статус</label>
          <select name="status" className="form-select" value={filters.status} onChange={handleFilterChange}>
            <option value="">Все</option>
            {statuses.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Дата от</label>
          <input
            type="date"
            name="dateFrom"
            className="form-control"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            placeholder="От какой даты"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Дата до</label>
          <input
            type="date"
            name="dateTo"
            className="form-control"
            value={filters.dateTo}
            onChange={handleFilterChange}
            placeholder="До какой даты"
          />
        </div>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <RecordForm record={selectedRecord} onClose={handleFormClose} />
          </div>
        </div>
      )}

      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Дата</th>
            <th>Статус</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Категория</th>
            <th>Подкатегории</th>
            <th>Комментарий</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.pub_date}</td>
              <td>{record.status}</td>
              <td>{record.type}</td>
              <td>{record.amount}</td>
              <td>{record.category}</td>
              <td>{record.subcategory.join(', ')}</td>
              <td>{record.comment}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(record)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(record.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordList;
