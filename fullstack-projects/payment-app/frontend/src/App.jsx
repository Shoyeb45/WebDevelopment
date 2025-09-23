import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// Components
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Users } from "./components/Users";
import { Dashboard } from "./components/Dashboard";
import { Suspense } from "react";
import { ProfileInfo } from "./components/ProfileInfo";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <div className="min-h-[calc(100vh-72px)]">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
                    <div className="text-xl text-gray-600">Loading...</div>
                  </div>
                }
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="h-[calc(100vh-72px)]">
                        <Landing />
                      </div>
                    }
                  />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route
                    path="/profile"
                    element={
                      <div className="pb-8">
                        <ProfileInfo />
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}
