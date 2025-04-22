import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const txns = [
    {
        "_id": "6804d2b8abf1072448c52c30",
        "senderUser": {
            "_id": "6804b782a91f7dde04f37548",
            "username": "shoyeb45",
            "firstName": "Shoyeb",
            "lastName": "Ansari"
        },
        "receiverUser": {
            "_id": "6804cdf73e9cdba1eb9ea944",
            "username": "Hammad",
            "firstName": "Hammad",
            "lastName": "Ansari"
        },
        "amount": 4400,
        "createdAt": "2025-04-20T10:55:52.193Z",
        "updatedAt": "2025-04-20T10:55:52.193Z",
        "__v": 0
    },
    {
        "_id": "6804e085e4d9bce805ed8fe1",
        "senderUser": {
            "_id": "6804b782a91f7dde04f37548",
            "username": "shoyeb45",
            "firstName": "Shoyeb",
            "lastName": "Ansari"
        },
        "receiverUser": {
            "_id": "6804df0cd00a3eb86a651813",
            "username": "Rehana",
            "firstName": "Rehana",
            "lastName": "Ansari"
        },
        "amount": 400,
        "createdAt": "2025-04-20T11:54:45.877Z",
        "updatedAt": "2025-04-20T11:54:45.877Z",
        "__v": 0
    },
    {
        "_id": "6804e099e4d9bce805ed8fe8",
        "senderUser": {
            "_id": "6804b782a91f7dde04f37548",
            "username": "shoyeb45",
            "firstName": "Shoyeb",
            "lastName": "Ansari"
        },
        "receiverUser": {
            "_id": "6804df58d00a3eb86a65181a",
            "username": "Ayesha",
            "firstName": "Ayesha",
            "lastName": "Ansari"
        },
        "amount": 800,
        "createdAt": "2025-04-20T11:55:05.514Z",
        "updatedAt": "2025-04-20T11:55:05.514Z",
        "__v": 0
    },
    {
        "_id": "6804e1bb5703c07d782a5843",
        "senderUser": {
            "_id": "6804df58d00a3eb86a65181a",
            "username": "Ayesha",
            "firstName": "Ayesha",
            "lastName": "Ansari"
        },
        "receiverUser": {
            "_id": "6804b782a91f7dde04f37548",
            "username": "shoyeb45",
            "firstName": "Shoyeb",
            "lastName": "Ansari"
        },
        "amount": 1200,
        "createdAt": "2025-04-20T11:59:55.519Z",
        "updatedAt": "2025-04-20T11:59:55.519Z",
        "__v": 0
    },
    {
        "_id": "68052a5f16de4681b7452b9e",
        "senderUser": {
            "_id": "6804df58d00a3eb86a65181a",
            "username": "Ayesha",
            "firstName": "Ayesha",
            "lastName": "Ansari"
        },
        "receiverUser": {
            "_id": "6804b782a91f7dde04f37548",
            "username": "shoyeb45",
            "firstName": "Shoyeb",
            "lastName": "Ansari"
        },
        "amount": 10,
        "createdAt": "2025-04-20T17:09:51.945Z",
        "updatedAt": "2025-04-20T17:09:51.945Z",
        "__v": 0
    }
];

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
        <BrowserRouter>
            <div>
                <div className="w-[100vw]">
                    <Header isUserLoggedIn={false}/>

                </div>
                
                <Routes>
                    <Route 
                        path="/" 
                        element={<Suspense fallback="loading...">
                            <div className="h-[90.8vh]">
                                <Landing isUserLoggedIn={false}/> 
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
                            <Dashboard name="Shoyeb Ansari" balance={3224} transactions={txns}/>
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
    );

}

