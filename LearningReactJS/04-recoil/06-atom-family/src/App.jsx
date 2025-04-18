import "./App.css";
import { RecoilRoot, useRecoilState } from "recoil";
import { todosAtomFamily } from "./atoms";
import { useState } from "react";

function App() {
  return (
    <RecoilRoot>
      <InputTodo></InputTodo>
      
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  console.log(id);
  
  return (
    <>
      <h1>{todo?.title}</h1>
      <h2>{todo?.description}</h2>
      <br />
    </>
  );
}

const InputTodo = () => {
  const [id, setId] = useState(0);

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
