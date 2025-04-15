import { memo } from "react";
import { useState, useCallback } from "react"

export default function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(function onClick() {
    console.log("Chlid clicked");
    
  }, []);

  return (
    <div>
      <Child onClick={onClick}></Child>
      <button onClick={(e) => setCount(count + 1)}>Count is {count}</button>    
    </div>
  )
}


const Child = memo(({ onClick }) => {
  console.log("Child re-renders");
  
  return (
    <div>
      <button onClick={onClick}>Button Clicked</button>
    </div>
  )
});