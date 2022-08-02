import React from 'react';

export default function Todo({ todo, toggleTodo }) {
    function handleToggleTodo() {
        toggleTodo(todo.id);
    }

    return (
        <>
            <div>
                <input type="checkbox" checked={todo.complete} onChange={handleToggleTodo}/>
                {todo.name}
            </div>
        </>
    )
}