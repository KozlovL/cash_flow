import React, { useState, useEffect } from 'react';

function CategoryForm({ category, types, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setType(category.type || '');
    } else {
      setName('');
      setType('');
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, name, type });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label">Название</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Тип</label>
        <select
          className="form-select"
          value={type}
          onChange={e => setType(e.target.value)}
          required
        >
          <option value="" disabled>Выберите тип</option>
          {types.map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary me-2">Сохранить</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
    </form>
  );
}

export default CategoryForm;
