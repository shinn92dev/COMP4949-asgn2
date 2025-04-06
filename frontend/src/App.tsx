import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignIn from "./pages/SignIn";
import Layout from "./Layout";
import Survey from "./pages/Survey";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <SignedIn>
                                <Dashboard />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </Layout>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Layout>
                            <SignIn />
                        </Layout>
                    }
                />
                <Route
                    path="/survey"
                    element={
                        <Layout>
                            <SignedIn>
                                <Survey />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
