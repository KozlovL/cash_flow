import React, { useEffect, useState } from 'react';
import { fetchCategories, deleteCategory, createCategory, updateCategory, fetchTypes } from '../../api';
import CategoryForm from './CategoryForm';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCategories();
    fetchTypes().then(data => setTypes(data.results || data));
  }, []);

  const loadCategories = () => {
    fetchCategories().then(data => setCategories(data.results || data));
  };

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      setCategories(prev => prev.filter(c => c.id !== id));
    });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleFormSave = (category) => {
    const apiCall = category.id ? updateCategory(category.id, category) : createCategory(category);
    apiCall.then(() => {
      setShowForm(false);
      loadCategories();
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h3>Категории</h3>
      <button className="btn btn-success mb-3" onClick={handleCreate}>Создать</button>
      {showForm && (
        <CategoryForm
          category={editingCategory}
          types={types}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.type}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(category)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
