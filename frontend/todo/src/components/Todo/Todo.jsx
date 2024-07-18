import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../../assets/todo_icon.png';
import Todoitems from './Todoitems';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  }

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  }

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-gray-200 bg-opacity-50 w-11/12 max-w-md p-7 min-h-[550px] rounded-xl mx-auto mt-16 flex flex-col">
      {/* TITLE */}
      <div className="flex items-center gap-2 mt-2 mb-0">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center w-full my-7 bg-gray-200 rounded-full">
        <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" type="text" placeholder="Add your task" />
        <button onClick={add} className="border-none rounded-full bg-primary w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-secondary">ADD+</button>
      </div>

      {/* TO DO LIST */}
      <div className="w-full">
        {todoList.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Todo;
