import { useState } from "react";


export default function App() {
  const [count, setCount] = useState(0);

  return (<div>
    <Count count={count} setCount={setCount}/>
  </div>)
}

// Push the buttons to Count component, we need setCount for buttons but for not Count
function Count({ count, setCount }) {
  return <div>
    { count }
    <Buttons count={count} setCount={setCount}></Buttons>
  </div>
}


function Buttons({ count, setCount }) {
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
