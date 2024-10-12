// FilterButtons.jsx
import React from 'react';

const FilterButtons = ({ setFilter, activeFilter }) => {
  return (
    <div className="flex space-x-4 p-4 ">
      <div>Filter by:</div>
      <button 
        className={`p-2 rounded-lg ${activeFilter === 'unread' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('unread')}
      >
        Unread
      </button>
      <button 
        className={`p-2 rounded-lg ${activeFilter === 'read' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('read')}
      >
        Read
      </button>
      <button 
        className={`p-2 rounded-lg ${activeFilter === 'favorites' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('favorites')}
      >
        Favorites
      </button>
    </div>
  );
};

export default FilterButtons;