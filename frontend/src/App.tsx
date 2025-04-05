import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignIn from "./pages/SignIn";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/dashboard"
                    element={
                        <>
                            <SignedIn>
                                <Dashboard />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </>
                    }
                />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
