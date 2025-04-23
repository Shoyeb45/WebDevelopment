import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// Components
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Users } from "./components/Users";
import { Dashboard } from "./components/Dashboard";
import { Suspense, useState } from "react";
import { ProfileInfo } from "./components/ProfileInfo";


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
                            <Users />
                        </Suspense>} 
                    />
                    <Route
                        path="/profile"
                        element={<Suspense fallback="loading..">
                            <div className="">
                                <ProfileInfo />
                            </div>
                        </Suspense>} 
                    />

                </Routes>
             
            </div>

        </BrowserRouter>
        </RecoilRoot>
    );

}

