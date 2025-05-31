import React, { useState } from 'react';
import RecordList from './records/RecordList';
import StatusList from './statuses/StatusList';
import TypeList from './types/TypeList';
import CategoryList from './categories/CategoryList';
import SubcategoryList from './subcategories/SubcategoryList';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('records');

  const renderTab = () => {
    switch (activeTab) {
      case 'records':
        return <RecordList />;
      case 'statuses':
        return <StatusList />;
      case 'types':
        return <TypeList />;
      case 'categories':
        return <CategoryList />;
      case 'subcategories':
        return <SubcategoryList />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>Записи</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'statuses' ? 'active' : ''}`} onClick={() => setActiveTab('statuses')}>Статусы</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'types' ? 'active' : ''}`} onClick={() => setActiveTab('types')}>Типы</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Категории</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'subcategories' ? 'active' : ''}`} onClick={() => setActiveTab('subcategories')}>Подкатегории</button>
        </li>
      </ul>
      {renderTab()}
    </div>
  );
}

export default Dashboard;
