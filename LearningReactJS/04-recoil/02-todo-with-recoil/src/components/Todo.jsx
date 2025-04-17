import { todosAtom } from "../stores/todo.store";
import { useRecoilState } from "recoil";


export function Todo({ id, title, description, completed }) {
    return (
        <div>
            <h1> {title} </h1>
            <h2> {description} </h2>
            <Status completed={completed} id={id}></Status>
        </div>   
    );
}

function Status({ completed, id }) {

    if (completed) {
        return (
            <div>
                Task completed
            </div>
        );
    }
    else if(completed === false) {
        return (
            <CompletedTodo id={id}></CompletedTodo>      
        )
    }
    return (<></>)
}

function CompletedTodo({ id }) {
    const [todos, setTodos] = useRecoilState(todosAtom);

    function completeTodo() {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {...todo, completed: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
        return;
    }

    return <div>
        <button onClick={completeTodo}>Mark As Completed</button>
    </div>
}