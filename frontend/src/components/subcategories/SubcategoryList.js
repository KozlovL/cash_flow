import React, { useEffect, useState } from 'react';
import { fetchSubcategories, fetchCategories, createSubcategory, updateSubcategory, deleteSubcategory } from '../../api';
import SubcategoryForm from './SubcategoryForm';

function SubcategoryList() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSubcategories();
    fetchCategories().then(data => setCategories(data.results || data));
  }, []);

  const loadSubcategories = () => {
    fetchSubcategories().then(data => setSubcategories(data.results || data));
  };

  const handleDelete = (id) => {
    deleteSubcategory(id).then(() => {
      setSubcategories(prev => prev.filter(s => s.id !== id));
    });
  };

  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingSubcategory(null);
    setShowForm(true);
  };

  const handleFormSave = (subcategory) => {
    const apiCall = subcategory.id
      ? updateSubcategory(subcategory.id, subcategory)
      : createSubcategory(subcategory);

    apiCall.then(() => {
      setShowForm(false);
      loadSubcategories();
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h3>Подкатегории</h3>
      <button className="btn btn-success mb-3" onClick={handleCreate}>Создать</button>
      {showForm && (
        <SubcategoryForm
          subcategory={editingSubcategory}
          categories={categories}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.category}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(sub)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sub.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubcategoryList;
