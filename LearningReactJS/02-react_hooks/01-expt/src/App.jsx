// import {Fragment} from "react"
import { useState, memo } from "react";


function App() {

  // version-2
  const [title, setTitle] = useState("Shoyeb");
  function changeTitle() {
      const n = Math.random();
    setTitle(n);
  }
  return (
    // Version 1
    // <Fragment>
    //   <Header title="Shoyeb" />
    //   <Header title="Hammad" />
    // </Fragment>

    // Version-2 - everything is getting re-rendered 
    // <>
    //   <button onClick={changeTitle}>Click me to change the title</button>
    //   <Header title={title}></Header>
    //   <Header>My name is Shoyeb</Header>
    // </>
    
    
    // Version-3
    // <>
    //   <HeaderWithButton></HeaderWithButton>
    //   <Header title="Shoyeb"></Header>
    // </>
    
    
    // Version-4 : Using React.memo()
    <>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={title}></Header>
      <Header title="Hammad"></Header>
      <Header title="Hammad"></Header>
      <Header title="Hammad"></Header>
      <Header title="Hammad"></Header>
    </>
    
  )
}


// Version - 3 
// function HeaderWithButton() {
//   const [title, setTitle] = useState("Shoyeb");

//   function updateTitle() {
//     setTitle(Math.random());
//   }
//   return (
//     <>
//       <button onClick={updateTitle}>Update the title</button>
//       <Header title={title}></Header>
//     </>
//   )
// }


const Header = memo(function Header({title}) {
  console.log(`Header re-rendered`);
  
  return (
    <div>
      My name is {title}
    </div>
  )
});


export default App
