import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignIn from "./pages/SignIn";
import Layout from "./Layout";
import Survey from "./pages/Survey";
import Diary from "./pages/Diary";
import DiaryWrite from "./pages/DiaryWrite";
import Error from "./pages/Error";
import Score from "./pages/Score";

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
                    path="/diary"
                    element={
                        <Layout>
                            <SignedIn>
                                <Diary />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </Layout>
                    }
                />
                <Route
                    path="/diary/write"
                    element={
                        <Layout>
                            <SignedIn>
                                <DiaryWrite />
                            </SignedIn>
                            <SignedOut>
                                <RedirectToSignIn />
                            </SignedOut>
                        </Layout>
                    }
                />
                <Route
                    path="/score"
                    element={
                        <Layout>
                            <SignedIn>
                                <Score />
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
                <Route
                    path="/error"
                    element={
                        <Layout>
                            <Error />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
