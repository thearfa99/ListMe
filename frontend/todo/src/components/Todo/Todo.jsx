// Todo.jsx
import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '/todo_icon.png';
import Todoitems from './Todoitems';
import axiosInstance from '../../utils/axiosInstance';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/tasks'); 
      setTodoList(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }

    try {
      const response = await axiosInstance.post('/add-task', { text: inputText });
      setTodoList((prev) => [...prev, response.data.task]);
      inputRef.current.value = "";
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/delete-task/${id}`);
      setTodoList((prvTodos) => prvTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTask = async (id, isComplete) => {
    try {
      const response = await axiosInstance.post(`/update-task/${id}`, { isComplete });
      setTodoList((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data.task : todo))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 w-11/12 max-w-md p-7 min-h-[550px] rounded-xl mx-auto mt-16 flex flex-col">
      <div className="flex items-center gap-2 mt-2 mb-0">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center w-full my-7 bg-gray-200 rounded-full">
        <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" type="text" placeholder="Add your task" />
        <button onClick={addTask} className="border-none rounded-full bg-primary w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-secondary">ADD+</button>
      </div>

      <div className="w-full">
        {todoList.map((item) => (
          <Todoitems
            key={item._id}
            text={item.text}
            id={item._id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={() => toggleTask(item._id, !item.isComplete)}
          />
        ))}
      </div>
    </div>
  )
}

export default Todo;
