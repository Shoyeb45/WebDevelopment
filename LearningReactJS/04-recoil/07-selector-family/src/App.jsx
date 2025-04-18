import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { todosAtomFamily } from "./atoms";
import { useEffect, useState } from "react";

function App() {
  return (
    <RecoilRoot>
      <Todo id={"2"}></Todo>
      <Todo id={"3"}></Todo>
      <Todo id={"10"}></Todo>
      <Todo id={"19"}></Todo>
      <Todo id={"13"}></Todo>
      
    </RecoilRoot>
  );
}

function Todo({ id }) {
  // const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  // const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  const todo = useRecoilValueLoadable(todosAtomFamily(id));

  console.log(todo.state);
  
  if (todo.state === "loading") {
    return <div>
      Fetching todo with id : {id} ...
    </div>
  }
  else if (todo.state === "hasValue") {
    return (
      <>
        <h1>{todo?.contents.todo}</h1>
        <h2>{todo?.contents.description}</h2>
        <br />
      </>
    );
  }
  else if (todo.state === "hasError") {
    return <div>
      Backend call had some error
    </div>
  }
  
  return (
    <div>
      No Todo
    </div>
  )
}

const InputTodo = () => {
  const [id, setId] = useState(1);

  return (
    <div>
      <dd>
        Enter todo id:
      </dd>
      <dt>
        <input type="number" onChange={e => { setId(e.target.value) }}/>
      </dt>
      <Todo id={id}></Todo>
    </div>
  )
}
export default App;
