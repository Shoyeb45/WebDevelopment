import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react"

export default function App() {
  const [n, setN] = useState(0);
  const [counter, setCounter] = useState(0);
  

  // Unoptimal way
  //   let sum = 0;
  //   // This is an expensive task
  //   for (let i = 1; i <= n; i++) {
  //     sum += i;
  //   }

  // optimised solution-1: using useEffect and another state variable
  // but here also there is 2 times rendering and one more state variable
  // const [sum, setSum] = useState(0);
  // useEffect(() => {
  //   let sum = 0;
  //   // This is an expensive task
  //   for (let i = 1; i <= n; i++) {
  //     sum += i;
  //   }
  //   setSum(sum);
  // }, [n]);


  // Best way - using useMemo

  const sum = useMemo(() => {
    let sum = 0;
    let startTime = Date.now();
    // This is an expensive task
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    console.log(`Time taken : ${(Date.now() - startTime) / 1000}`);
    
    return sum;
  }, [n]); // call this when n changes
  return (

    <div>
      <dd>
        <input type="number" onChange={(e) => {
          setN(parseInt((!e.target.value? 0: e.target.value)))
        }}
        defaultValue={0}
        />
      </dd>
      <div>
        {/* Don't use this */}
        {/* The sum is {(n * (n + 1) / 2).toLocaleString()} */}

        The sum from 1 to {n} is : {sum.toLocaleString()}
      </div>

      <dd>
        <button onClick={(e) => setCounter(counter + 1)}>Counter is {`{${counter}}`}</button>
      </dd>
    </div>
  )
}