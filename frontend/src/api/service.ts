import { config } from "@/config/config";
import { SurveyFormValues } from "../components/container/SurveyContainer";

const BASE_URL = config.API_BASE_URL;

export const checkInitialSurvey = async (userId: string) => {
    console.log(userId);
    const response = await fetch(`${BASE_URL}user/survey/status/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
        throw new Error(`Checking Initial Survey Status Fetch Request Fail: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const submit_survey_request = async (survey_data: SurveyFormValues) => {
    try {
        const userId = window.localStorage.getItem("user_id");
        if (!userId) {
            throw Error("User id is not defined.");
        }

        const response = await fetch(`${BASE_URL}predict/survey/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, data: survey_data }),
        });
        if (!response.ok) {
            throw new Error(
                `Checking Initial Survey Status Fetch Request Fail: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchAllScoresRequest = async () => {
    try {
        const userId = window.localStorage.getItem("user_id");
        if (!userId) {
            throw new Error("User id is not defined.");
        }

        const response = await fetch(`${BASE_URL}score/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
            throw new Error(`Fetching score data failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all scores:", error);
        return null;
    }
};
