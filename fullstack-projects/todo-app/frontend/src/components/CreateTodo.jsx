import { useState } from "react";



export function CreateTodo(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function addTodo() {
        try {
            const todoObj = {
                title,
                description,
            };

            const res = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todoObj)
            });
            
            props.setTodos([...props.todos, todoObj]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <dt>
                Enter title of todo
            </dt>
            <dd>
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            </dd>

            <dt>
                Enter description of todo:
            </dt>
            <dd>
                <input type="text" onChange={(e) => setDescription(e.target.value)}/>
            </dd>

            <dd>
                <button onClick={addTodo}>Add Todo</button>
            </dd>
        </div>
    )
} 