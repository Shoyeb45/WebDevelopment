import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@repo/ui/button";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
        <Button appName='react app'> Hello from react app </Button>
      </div>
    </>
  )
}

export default App
