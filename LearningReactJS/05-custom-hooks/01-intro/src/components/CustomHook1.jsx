import { useEffect, useState } from "react"


// custom hook
function useTodos(api, n) {
    
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const intervalRef = setInterval(() => {
            fetch(api)
              .then((data) => data.json())
              .then((data) => {
                setTodos(data);
                setLoading(false);
            });
        }, n * 1000);
        fetch(api)
          .then((data) => data.json())
          .then((data) => {
            setTodos(data);
            setLoading(false);
        });


        return function() {
            clearInterval(intervalRef); 
        }
    }, [n]);

    return [todos, loading];
}
export function CustomHookExTodo() {
    const [todos, loading] = useTodos(`https://dummyjson.com/todos/random/${Math.floor(Math.random() * 10)}`, 5);
    console.log(loading);
    if (loading) {
        return (
            <div>
                loading....
            </div>
        )
    }
    return (
        <div>
            {todos.map((todo) => <Todo todo={todo}></Todo>)}
        </div>
    )
}

function Todo({ todo }) {
    return (
        <>
            <h1>{todo.todo}</h1>
            <h2>{todo.completed ? "Completed": "Not Completed"}</h2>
        </>
    )
}