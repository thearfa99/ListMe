import React from 'react';

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle, createdTime, completedTime }) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between">
        <span className={`text-lg ${isComplete ? 'text-green-600 opacity-45' : ''}`}>{text}</span>
        <button
          onClick={() => deleteTodo(id)}
          className="bg-red-400 text-black px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>Created: {new Date(createdTime).toLocaleDateString()}</span>
        {completedTime && <span>Completed: {new Date(completedTime).toLocaleDateString()}</span>}
      </div>
      <button
        onClick={toggle}
        className={`mt-2 ${isComplete ? 'bg-green-400 hover:bg-green-600 opacity-45' : 'bg-gray-400 hover:bg-green-600'} text-black px-4 py-2 rounded`}
      >
        {isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
};

export default Todoitems;
