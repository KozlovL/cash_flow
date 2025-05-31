import React, { useEffect, useState } from 'react';
import { fetchTypes, deleteType, createType, updateType } from '../../api';
import TypeForm from './TypeForm';

function TypeList() {
  const [types, setTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = () => {
    fetchTypes().then(data => setTypes(data.results || data));
  };

  const handleDelete = (id) => {
    deleteType(id).then(() => {
      setTypes(prev => prev.filter(type => type.id !== id));
    });
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingType(null);
    setShowForm(true);
  };

  const handleFormSave = (type) => {
    const apiCall = type.id ? updateType(type.id, type) : createType(type);
    apiCall.then(() => {
      setShowForm(false);
      loadTypes();
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h3>Типы</h3>
      <button className="btn btn-success mb-3" onClick={handleCreate}>Создать</button>
      {showForm && (
        <TypeForm
          type={editingType}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(type)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(type.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TypeList;
