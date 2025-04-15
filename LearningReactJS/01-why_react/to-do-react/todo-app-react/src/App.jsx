import { useState } from "react";



function App() {
  const [todos, setTodo] = useState([]);

  return (
    <div>
      <InputCompo todos={todos} setTodo={setTodo} />
      {todos.map((todo) => {
        return <Todo title={todo.title} description={todo.description} />;
      })}
    </div>
  );
}

function InputCompo(props) {
  // State variable of title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addTodo(todo) {
    props.setTodo([
      ...props.todos,
      {
        title: title,
        description: description,
      },
    ]);
    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <dt>Todo Title:</dt>
      <dd>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </dd>

      <dt>Todo Description:</dt>
      <dd>
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
      </dd>
      <dd>
        <button onClick={addTodo}>Add Todo</button>
      </dd>
    </div>
  );
}

/**
 *
 * @param {*} props : {title, description}
 */
function Todo(props) {
  return (
    <>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </>
  );
}
export default App;
