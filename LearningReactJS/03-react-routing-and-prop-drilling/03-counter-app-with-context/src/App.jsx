import { useState } from "react";
import { CountContext } from "./context";
import { useContext } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  // wrap anyone that wants to use the teleported value inside a provider
  return (
  <div>
    <CountContext.Provider value={count}>
      <Count count={count} setCount={setCount}/>
    </CountContext.Provider>
  </div>)
}

function Count({ setCount }) {
  return <div>
    <CountRenderer></CountRenderer>    
    <Buttons setCount={setCount}></Buttons>
  </div>
}

function CountRenderer() {
  const count = useContext(CountContext);
  
  return (<div>
    Count is { count }
  </div>);
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return (<div>
    <button onClick={() => {
      setCount(count + 1);
    }}>
      Increase the count
    </button>

    <button onClick={() => {
      setCount(count - 1);
    }}>
      Decrease the count
    </button>
  </div>)
}
