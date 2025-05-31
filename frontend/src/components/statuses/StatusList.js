import React, { useEffect, useState } from 'react';
import { fetchStatuses, deleteStatus, createStatus, updateStatus } from '../../api';
import StatusForm from './StatusForm';

function StatusList() {
  const [statuses, setStatuses] = useState([]);
  const [editingStatus, setEditingStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadStatuses();
  }, []);

  const loadStatuses = () => {
    fetchStatuses().then(data => setStatuses(data.results || data));
  };

  const handleDelete = (id) => {
    deleteStatus(id).then(() => {
      setStatuses(prev => prev.filter(status => status.id !== id));
    });
  };

  const handleEdit = (status) => {
    setEditingStatus(status);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingStatus(null);
    setShowForm(true);
  };

  const handleFormSave = (status) => {
    const apiCall = status.id ? updateStatus(status.id, status) : createStatus(status);
    apiCall.then(() => {
      setShowForm(false);
      loadStatuses();
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h3>Статусы</h3>
      <button className="btn btn-success mb-3" onClick={handleCreate}>Создать</button>
      {showForm && (
        <StatusForm
          status={editingStatus}
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
          {statuses.map(status => (
            <tr key={status.id}>
              <td>{status.id}</td>
              <td>{status.name}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(status)}>Редактировать</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(status.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatusList;
