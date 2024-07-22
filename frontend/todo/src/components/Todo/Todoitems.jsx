// Todoitems.jsx
import React from 'react';

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <div className="flex items-center">
        <input type="checkbox" checked={isComplete} onChange={() => toggle(id)} />
        <p className={`ml-4 ${isComplete ? 'line-through' : ''}`}>{text}</p>
      </div>
      <button onClick={() => deleteTodo(id)} className="text-red-500">Delete</button>
    </div>
  );
};

export default Todoitems;
