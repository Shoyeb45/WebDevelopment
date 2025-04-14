import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todo } from "./components/Todo";

export let id = 3;

export function App() {
  const [todos, setTodos] = useState([
    { id:1, title: "Complete react keys", description: "Completed" },
    { id:2, title: "To play", description: "Played" },
    { id:3, title: "To study", description: "Studied" },
  ]);

  return (
    <>
      <CreateTodo todos={todos} setTodos={setTodos}></CreateTodo>
      {todos.map((todo) => <Todo key={todo.id} title={todo.title} description={todo.description}></Todo>)}
    </>
  );
}
