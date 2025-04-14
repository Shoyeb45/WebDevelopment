import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("https://dummyjson.com/todos/random/10")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            res[i].description = "Dummy description";
          }
          setTodos(res);
        })
        .catch((err) => console.error(err));
    }, 10000);
   }, []);

  return (<div>
    {todos.map((todo) => {
      return <Todo key={todo.id} title={todo.todo} description={todo.description}></Todo>
    })}
  </div>);
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  );
}
export default App;
