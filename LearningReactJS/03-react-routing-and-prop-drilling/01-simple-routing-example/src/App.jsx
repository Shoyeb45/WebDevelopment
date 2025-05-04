import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
// lazy loading : optimising client side routing
const Landing = lazy(() => { 
  return import("./components/Landing") 
});
const Dashboard = lazy(() => { 
  return import("./components/Dashboard"); 
}); 

export default function App() {
  return (
    <div>
      {/* <div style={{background: "black", color: "White"}}>
        This is fixed topbar
      </div> */}

      {/* Create two buttons to navigate between pages */}

      {/* Not right way - it will again refresh the page */}
      {/* <button onClick={() => { window.location.href = "/" }}>Landing Page</button>
      <button onClick={() => { window.location.href = "/dashboard" }}>Dashboard</button> */}

      <BrowserRouter>
        {/* Using useNavigate hook from react-router-dom - it shoub be inside browser route */}
        {/* No refresh */}
        <AppBar></AppBar>
          <Routes>
          {/* use Suspense API for fallback, because the component will be getting fetched from server, so it's like asynchronous and there will be little delay to laod the component so we need something to show meanwhile it'll load  */}
          <Route path="/" element={<Suspense fallback="loading....."> <Landing /> </Suspense>}></Route>
          <Route path="/dashboard" element={<Suspense fallback="loading....."> <Dashboard /> </Suspense>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


function AppBar() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/") }>Landing Page</button>
      <button onClick={() => navigate("/dashboard") }>Dashboard Page</button>
    </div>
  )
}