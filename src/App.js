import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([]);
    const newTodoNameRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos.length !== 0) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    function handleAddTodo(e) {
        const name = newTodoNameRef.current.value;
        if (name === '') return;
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
        newTodoNameRef.current.value = null;
    }

    function handleClearCompleted(e) {
        const newTodos = todos.filter(todo => !todo.complete);
        setTodos(newTodos);
    }

    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input type="text" ref={newTodoNameRef}/>
            <button onClick={handleAddTodo}>Add</button>
            <button onClick={() => setTodos([])}>Clear all</button>
            <button onClick={handleClearCompleted}>Clear completed</button>
            <div>{todos.filter(todo => !todo.complete).length} left</div>
        </>
    );
}

export default App;
