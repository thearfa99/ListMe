import React from 'react';

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle, createdTime, completedTime, description }) => {
  return (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-sm mb-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <span className={`flex-1 text-base ${isComplete ? 'text-green-500 opacity-50' : ''}`}>{text}</span>
        <button
          onClick={() => deleteTodo(id)}
          className="border border-red-500 rounded px-3 py-1 text-red-500 hover:bg-red-100 text-sm"
        >
          Delete
        </button>
      </div>
      <div className="mt-1 text-xs text-gray-600">
        {description && <p>Description: {description}</p>}
        <div className="flex justify-between mt-1">
          <span>Created On: {new Date(createdTime).toLocaleString()}</span>
          {completedTime && (
            <span className="text-right">Completed On: {new Date(completedTime).toLocaleString()}</span>
          )}
        </div>
      </div>
      <button
        onClick={toggle}
        className={`mt-2 border rounded px-3 py-1 ${isComplete ? 'bg-primary opacity-50 text-black hover:bg-secondary' : 'bg-primary text-black hover:bg-secondary'} text-sm`}
      >
        {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
};

export default Todoitems;
