import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// Components
import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { Landing } from "./components/Landing";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./components/SignUp";
import { TransactionTable } from "./components/TransactionTable";
import { SignIn } from "./components/SignIn";
import { Users } from "./components/Users";
import { Dashboard } from "./components/Dashboard";
import { Suspense, useState } from "react";



const users = [
    {
        "_id": "6804b782a91f7dde04f37548",
        "username": "shoyeb45",
        "firstName": "Shoyeb",
        "lastName": "Ansari",
        "balance": 7410
    },
    {
        "_id": "6804cdf73e9cdba1eb9ea944",
        "username": "Hammad",
        "firstName": "Hammad",
        "lastName": "Ansari",
        "balance": 16600
    },
    {
        "_id": "6804df0cd00a3eb86a651813",
        "username": "Rehana",
        "firstName": "Rehana",
        "lastName": "Ansari",
        "balance": 13400
    },
    {
        "_id": "6804df58d00a3eb86a65181a",
        "username": "Ayesha",
        "firstName": "Ayesha",
        "lastName": "Ansari",
        "balance": 590
    }
];

export default function App() {

    return (
        <RecoilRoot>
        <BrowserRouter>
            <div>
                <div className="w-[100vw]">
                    <Header />
                </div>
                
                <Routes>
                    <Route 
                        path="/" 
                        element={<Suspense fallback="loading...">
                            <div className="h-[90.8vh]">
                                <Landing /> 
                            </div> 
                        </Suspense>}
                    />
                    <Route 
                        path="/signin" 
                        element={<Suspense fallback="loading..." >
                            <SignIn />
                        </Suspense>} 
                    />

                    <Route 
                        path="/signup" 
                        element={<Suspense fallback="loading..." >
                            <SignUp />
                        </Suspense>} 
                    />

                    <Route
                        path="/dashboard"
                        element={<Suspense>
                            <Dashboard/>
                        </Suspense>} 
                    />
                    
                    <Route
                        path="/users"
                        element={<Suspense fallback="loading..">
                            <Users users={users}/>
                        </Suspense>} 
                    />

                </Routes>
             
            </div>

        </BrowserRouter>
        </RecoilRoot>
    );

}

