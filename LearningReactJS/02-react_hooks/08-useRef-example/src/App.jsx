import { useEffect, useState, useRef } from "react";

// we need to override the income tax after 5 seconds of react rendering
export default function App() {
  const [incomeTax, setIncomeTax] = useState(20000);
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      console.log(divRef.current);
      
      // Access the element - vanilla js way - not recommended (wrong way)
      // document.getElementById("i-income-tax").innerHTML = 10;

      // react way(correct way)
      divRef.current.innerHTML = 10;
    }, 5000);
  }, []);
  return (
    <div>
      Hi there, your income tax is <i ref={divRef}>{incomeTax}</i>
    </div>
  );
}