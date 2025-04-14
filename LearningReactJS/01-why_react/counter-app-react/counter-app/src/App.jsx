// hook
import { useState } from "react";

function App() {
  // define state
  const [count, setCount] = useState(0);

  
  return (
    <div>
      <CustomButton count={count} setCount={setCount}/>
    </div>
  );
}

// Our custom button
function CustomButton(props) {
  function onClickHandler() {
    props.setCount(props.count + 1);
  }
  
  return (
    <button onClick={onClickHandler}>
      Counter {props.count}
    </button>
  );
}

export default App;
