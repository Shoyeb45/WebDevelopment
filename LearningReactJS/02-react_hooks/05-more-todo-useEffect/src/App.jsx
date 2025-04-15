import { useEffect } from "react";
import { useState } from "react"

export default function App() {
  const [id, setId] = useState("1");



  return (
    <div>
        {/* <button onClick={changeId}>1</button>
        <button onClick={changeId}>2</button>
        <button onClick={changeId}>3</button>
        <button onClick={changeId}>4</button> */}
        Enter a id: <input type="number" onChange={(e) => setId(e.target.value.toString())}/>
      <Todo id={id}></Todo>
    </div>
  )
}

function Todo({ id }) {
  
  
  const [todo, setTodo] = useState({});

  // if the dependency array is empty then it will not call the backend, because it doesn't say it to re run, so we need to pass id in dependency array
  useEffect(() => {
    console.log("Use effect");
    
    
    fetch("https://dummyjson.com/todos/" + id)
      .then((res) => res.json())
      .then((res) => {
        res.description = "New Description";
        setTodo(res);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      id: {id}
      <h1>{todo.todo}</h1>
      <h2>{todo.description}</h2>
    </div>
  )
}