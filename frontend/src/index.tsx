import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}
console.log();
const rootEl = document.getElementById("root");
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                <App />
            </ClerkProvider>
        </React.StrictMode>
    );
}
