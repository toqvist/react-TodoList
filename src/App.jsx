import React, { useState, useRef, useEffect }from 'react';
import TodoList from './lib/TodoList';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect (() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo (e) {
    const name = todoNameRef.current.value;
    if ( name === "") {
      return
    } else {
      setTodos(prevTodos => {
        return [...prevTodos, {id:uuidv4(), name:name, complete:false}]
      })
      
      todoNameRef.current.value = null;
    }
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todoTT = newTodos.find(todoTT => todoTT.id === id )
    todoTT.complete = !todoTT.complete;
    setTodos(newTodos);
  }
 
  function handleClearTodos () {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
    
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Todo's</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;