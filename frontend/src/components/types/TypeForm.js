import React, { useState, useEffect } from 'react';

function TypeForm({ type, onSave, onCancel }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (type) {
      setName(type.name);
    } else {
      setName('');
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...type, name });
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
      <button type="submit" className="btn btn-primary me-2">Сохранить</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
    </form>
  );
}

export default TypeForm;
