import { useEffect, useState } from "react";
import { useAuth, useSession } from "@clerk/clerk-react";
import { loginFetchRequest } from "@/src/api/authentication";
import { checkInitialSurvey } from "@/src/api/service";
import { useNavigate } from "react-router-dom";
const DashboardContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isSignedIn } = useAuth();
    const session = useSession();
    const navigate = useNavigate();
    useEffect(() => {
        const handelVerifyAuth = async () => {
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
                const userData = await loginFetchRequest(token);
                const surveyStatusData = await checkInitialSurvey(userData.data.user_id);
                const surveyStatus = surveyStatusData.data.survey_statue;
                if (!surveyStatus) {
                    navigate("/survey");
                }
                setIsLoading(false);
                // window.localStorage.setItem("verified", "true");
            } catch (error) {
                console.error(error);
            }
        };

        handelVerifyAuth();
    }, [isSignedIn, session.session, navigate]);
    if (isLoading) return <p>Loading...</p>;
    return <div className="mt-10">Dashboard</div>;
};

export default DashboardContainer;
