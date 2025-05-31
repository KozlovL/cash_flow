const BASE_URL = 'http://localhost:8000/api';

export const fetchRecords = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (key === 'dateFrom') params.append('pub_date_after', value);
      else if (key === 'dateTo') params.append('pub_date_before', value);
      else params.append(key, value);
    }
  });
  return fetch(`${BASE_URL}/records/?${params}`).then(res => res.json());
};

export const createRecord = (data) =>
  fetch(`${BASE_URL}/records/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateRecord = (id, data) =>
  fetch(`${BASE_URL}/records/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteRecord = (id) =>
  fetch(`${BASE_URL}/records/${id}/`, { method: 'DELETE' });

export const fetchCategoriesByTypeName = (typeName) => {
  const url = typeName
    ? `${BASE_URL}/categories/?type=${encodeURIComponent(typeName)}`
    : `${BASE_URL}/categories/`;
  return fetch(url).then(res => res.json());
};

export const fetchSubcategoriesByCategoryName = (categoryName) => {
  const url = categoryName
    ? `${BASE_URL}/subcategories/?category=${encodeURIComponent(categoryName)}`
    : `${BASE_URL}/subcategories/`;
  return fetch(url).then(res => res.json());
};

export const fetchTypes = () =>
  fetch(`${BASE_URL}/types/`).then(res => res.json());

export const fetchStatuses = () =>
  fetch(`${BASE_URL}/statuses/`).then(res => res.json());

export const fetchCategories = () =>
  fetch(`${BASE_URL}/categories/`).then(res => res.json());

export const fetchSubcategories = () =>
  fetch(`${BASE_URL}/subcategories/`).then(res => res.json());

export const createType = (data) =>
  fetch(`${BASE_URL}/types/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateType = (id, data) =>
  fetch(`${BASE_URL}/types/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteType = (id) =>
  fetch(`${BASE_URL}/types/${id}/`, { method: 'DELETE' });

export const createStatus = (data) =>
  fetch(`${BASE_URL}/statuses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateStatus = (id, data) =>
  fetch(`${BASE_URL}/statuses/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteStatus = (id) =>
  fetch(`${BASE_URL}/statuses/${id}/`, { method: 'DELETE' });

export const createCategory = (data) =>
  fetch(`${BASE_URL}/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateCategory = (id, data) =>
  fetch(`${BASE_URL}/categories/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteCategory = (id) =>
  fetch(`${BASE_URL}/categories/${id}/`, { method: 'DELETE' });

export const createSubcategory = (data) =>
  fetch(`${BASE_URL}/subcategories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateSubcategory = (id, data) =>
  fetch(`${BASE_URL}/subcategories/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const deleteSubcategory = (id) =>
  fetch(`${BASE_URL}/subcategories/${id}/`, { method: 'DELETE' });