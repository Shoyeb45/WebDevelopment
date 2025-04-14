import { useState } from "react";
export function CreateTodo({setTodos, todos}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function addTodo(e) {
        setTodos([...todos, {id: todos.length + 1, title, description}]);
    }

    return (
        <div>
            <dd>
                Enter title
            </dd>
            <dt>
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            </dt>

            <dd>
                Enter description
            </dd>
            <dt>
                <input type="text" onChange={(e) => setDescription(e.target.value)}/>
            </dt>

            <dd>
                <button onClick={addTodo}>Add Todo</button>
            </dd>
        </div>
    );
}