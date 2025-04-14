// ---- Syntax 1 ------


// function App() {
//   return (
//     <>
//       <CardWrapper InnerComponent={TextComponent}></CardWrapper>
//     </>
//   )
// }

// function TextComponent() {
//   return (
//     <>
//       Hammad
//     </>
//   )
// }
// function CardWrapper({InnerComponent}) {
//   return (
//     <div style={{
//       border: "2px solid black",
//       padding: "10px"
//     }}>
//       <InnerComponent></InnerComponent>
//     </div>
//   )
// }

// -----------------------------------------------------------------------

// ---------------------- Real Syntax ------------------------------------


function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <Card>
        <div>
          Name
        </div>

        <div>
          Description
        </div>
      </Card>

      <Card>
        Something
      </Card>
    </div>
  )
}

function Card({ children }) {
  
  return (
    <div style={{
      border: "2px solid black",
      padding: "20px"
    }}>
      {children}
    </div>
  )  
}
export default App
