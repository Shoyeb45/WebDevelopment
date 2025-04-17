import { useRecoilValue } from "recoil";
import { todosAtom, completedTodosAtom } from "../stores/todo.store";
import { Todo } from "./Todo";
import "../styles/todos.css";

export function Todos() {
  const todos = useRecoilValue(todosAtom);
    
  return (
    <div className="todos-div">
        <p>All Todos</p>
        
      {todos.map((todo) => {
        return <Todo id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} key={todo.id}></Todo>;
      })}
    </div>
  );
}

export function CompletedTodos() {
  const todos = useRecoilValue(completedTodosAtom);
    
  return (
    <div className="todos-div">
        <p>Completed Todos</p>
        
      {todos.map((todo) => {
        return <Todo id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} key={todo.id}></Todo>;
      })}
    </div>
  );
}

export function IncompleteTodos() {
  const todos = useRecoilValue(todosAtom);
    
  return (
    <div className="todos-div">
        <p>Incomplete Todos</p>
        
      {todos.map((todo) => {
        return !todo.completed && <Todo id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} key={todo.id}></Todo>;
      })}
    </div>
  );
}
