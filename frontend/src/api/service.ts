import { config } from "@/config/config";

const BASE_URL = config.API_BASE_URL;

export const checkInitialSurvey = async (userId: string) => {
    console.log(userId);
    const response = await fetch(`${BASE_URL}user/survey/status`, {
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
