import { config } from "@/config/config";

const BASE_URL = config.API_BASE_URL;

export const fetchAllDiaryRequest = async () => {
    const userId = window.localStorage.getItem("user_id");
    const response = await fetch(`${BASE_URL}diary/get/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
        throw new Error(`Fetching Diary Request Fail: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const storeDiaryRequest = async (diary: string, date: string) => {
    const userId = window.localStorage.getItem("user_id");
    const response = await fetch(`${BASE_URL}diary/store/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, diary: diary, date: date }),
    });
    if (!response.ok) {
        throw new Error(`Storing Diary Request Fail: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
