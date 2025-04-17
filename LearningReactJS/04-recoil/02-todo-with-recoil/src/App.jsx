import { RecoilRoot } from "recoil";
import { InputTodo } from "./components/InputTodo";
import { Todos, CompletedTodos, IncompleteTodos } from "./components/Todos";
import "./App.css"

export default function App() {
  
  return (
    <>
      <RecoilRoot>
        <InputTodo></InputTodo>
        <div className="todos-container">
          <Todos></Todos>
          <IncompleteTodos></IncompleteTodos>
          <CompletedTodos></CompletedTodos>
        </div>
      </RecoilRoot>
    </>
  )
}