import { CreateTodo } from "./components/CreateTodo";
import { useState } from "react";
import { Todos } from "./components/Todos";
import { ShowTodos } from "./components/ShowTodos";

function App() {
  const [todos, setTodos] = useState([]);
  
  return (
    <>
      <div style={{
        display: "flex",
        gap: "40px"
      }}>
        <CreateTodo todos={todos} setTodos={setTodos}></CreateTodo>
        <ShowTodos todos={todos} setTodos={setTodos}></ShowTodos>
      </div>
      <Todos todos={todos} setTodos={setTodos}/>
    </>
  );
}

export default App;
