import { Component, useEffect, useState } from "react";
import { CustomHookExTodo } from "./components/CustomHook1";
import { BrowserRelatedHooks } from "./components/BrowserRelatedHooks";
import { MousePointer } from "./components/MousePointerPosition";
import { WidthAndHeight } from "./components/DynamicWidthAndHeight";
import { PerformanceBasedHooksEx } from "./components/PerformanceBased";
import { Users } from "./components/DebounceHookEx";
// export default function App() {
//   const [isShow, setIsShow] = useState(true);

//   useEffect(() => {
//       setTimeout(() => {
//         setIsShow(p => !p);
//       }, 5000)
//   }, []);

//   return (
//     <>
//       {isShow? <MyComponent /> : <div></div>}
//     </>
//   )
// }

export default function App() {
  return (
    <div>
      {/* <CustomHookExTodo /> */}
      {/* <BrowserRelatedHooks /> */}
      {/* <MousePointer /> */}
      {/* <WidthAndHeight /> */}
      {/* <PerformanceBasedHooksEx /> */}
      <Users />
    </div>
  )
}



// class MyComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     }
//   }


//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 })
//   }
  
//   render() {
//     return (
//       <div>
//         <p>Count is: {this.state.count}</p>
//         <button onClick={this.incrementCount  }>Increment count</button>
//       </div>
//     )
//   }
// }

// Lifecycle event : functional component
// function MyComponent() {
//   useEffect(() => {
//     console.warn("MyComponent is mounted");
//     return function(){
//       console.log("MyComponent is unmounted");
//     }
//   }, []);

//   return (
//     <div>
//       My component
//     </div>
//   )
// }

// Lifecycle event : class based component
class MyComponent extends Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    console.log("Component mounted");
    
  }

  componentWillUnmount() {
    console.log("Component unmounted");
  }
  render() {
    return (
      <div>
        My component
      </div>
    )
  }
}