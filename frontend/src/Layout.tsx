import React from "react";
import Header from "./components/global/Header";
import { useUser } from "@clerk/clerk-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isSignedIn } = useUser();
    return (
        <div className="min-h-screen max-w-6xl mx-auto bg-gray-100">
            {isSignedIn && <Header />}

            <main className="px-4 py-6">{children}</main>
        </div>
    );
};

export default Layout;
