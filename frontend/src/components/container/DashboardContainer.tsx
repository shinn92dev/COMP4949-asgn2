import { useEffect, useState } from "react";
import { useAuth, useSession } from "@clerk/clerk-react";
import { loginFetchRequest } from "@/src/api/authentication";

const DashboardContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isSignedIn } = useAuth();
    const session = useSession();
    useEffect(() => {
        const verifyAuth = async () => {
            // TODO: ADD feature that skip this  once verified
            // const verified = window.localStorage.getItem("verified") == "true";
            // if (verified) {
            //     return;
            // }
            const token = await session.session?.getToken({ template: "moodiary_backend" });
            try {
                if (!isSignedIn || !token) {
                    throw Error("User is not signed in");
                }
                const data = await loginFetchRequest(token);
                console.log(data);
                setIsLoading(false);
                // window.localStorage.setItem("verified", "true");
            } catch (error) {
                console.error(error);
            }
        };
        verifyAuth();
    }, [isSignedIn, session.session]);
    if (isLoading) return <p>Loading...</p>;
    return <div>Dashboard</div>;
};

export default DashboardContainer;
