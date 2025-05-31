import React, { useState, useEffect } from 'react';

function SubcategoryForm({ subcategory, categories, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (subcategory) {
      setName(subcategory.name || '');
      setCategory(subcategory.category || '');
    } else {
      setName('');
      setCategory('');
    }
  }, [subcategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...subcategory, name, category });
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
        <label className="form-label">Категория</label>
        <select
          className="form-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary me-2">Сохранить</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
    </form>
  );
}

export default SubcategoryForm;
