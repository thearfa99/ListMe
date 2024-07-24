import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '/todo_icon.png';
import Todoitems from './todoitems';
import axiosInstance from '../../utils/axiosinstance';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputError, setInputError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Add state for success messages
  const inputRef = useRef();

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      setTodoList(response.data.tasks);
      setGeneralError('');
      setSuccessMessage(''); // Clear success message on fetch
    } catch (error) {
      setGeneralError('Error fetching tasks.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // Clear message after 5 seconds
  };

  const addTask = async () => {
    const inputText = inputRef.current.value.trim();
    const description = prompt("Enter a description for the task (optional):"); // Prompt for description

    if (inputText === "") {
      setInputError('Task cannot be empty or whitespace only.');
      return;
    }

    try {
      const response = await axiosInstance.post('/add-task', {
        text: inputText,
        description: description || "", // Send description or empty string
      });
      setTodoList((prev) => [...prev, response.data.task]);
      inputRef.current.value = "";
      setInputError(''); // Clear error on successful addition
      setGeneralError('');
      showSuccessMessage('Task added successfully!'); // Show success message
    } catch (error) {
      setGeneralError('Error adding task.');
    }
  };

  const deleteTodo = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (!isConfirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/delete-task/${id}`);
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setGeneralError('');
      showSuccessMessage('Task deleted successfully!'); // Show success message
    } catch (error) {
      setGeneralError('Error deleting task.');
    }
  };

  const toggleTask = async (id, isComplete) => {
    try {
      const response = await axiosInstance.post(`/update-task/${id}`, { isComplete });
      setTodoList((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data.task : todo))
      );
      setGeneralError('');
      showSuccessMessage(response.data.message); // Show success message from response
    } catch (error) {
      setGeneralError('Error updating task.');
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 w-11/12 max-w-2xl p-7 min-h-[650px] rounded-xl mx-auto mt-12 flex flex-col overflow-y-auto">
      <div className="flex items-center gap-2 mt-2 mb-0">
        <img className="w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center w-full my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={addTask}
          className="border-none rounded-full bg-primary w-32 h-14 text-black text-lg font-medium cursor-pointer hover:bg-secondary"
        >
          ADD+
        </button>
      </div>

      {inputError && <p className="text-red-500 text-sm mb-4 text-center">{inputError}</p>}
      {generalError && <p className="text-red-500 text-sm mb-4 text-center">{generalError}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>} {/* Display success message */}

      <div className="w-full">
        {todoList.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available. Add a task to get started!</p>
        ) : (
          todoList.map((item) => (
            <Todoitems
              key={item._id}
              text={item.text}
              id={item._id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={() => toggleTask(item._id, !item.isComplete)}
              createdTime={item.createdTime}
              completedTime={item.completedTime}
              description={item.description}  // Pass the description
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;

