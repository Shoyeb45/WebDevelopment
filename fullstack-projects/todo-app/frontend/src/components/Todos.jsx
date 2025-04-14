
export function Todos(props) {
    
    async function markCompleted(event) {
        try {
            const response = await fetch("http://localhost:3000/complete", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: event.target.id})
            });
            console.log((await response.json()));
            props.setTodos(props.todos);
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {
                props.todos.map((todo) => {
                    return (
                        <div>
                            <h1>{todo.title}</h1>
                            <h2>{todo.description}</h2>
                            {
                                !todo.completed && (
                                    <button onClick={markCompleted} id={todo._id}>Mark as completed</button>
                                ) || 
                                todo.completed && (
                                    <p>Todo completed</p>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}