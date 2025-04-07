import { config } from "@/config/config";

const BASE_URL = config.API_BASE_URL;

export const loginFetchRequest = async (token: string) => {
    console.log(BASE_URL + "authentication/");
    const response = await fetch(`${BASE_URL}authentication/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Login Fetch Request Fail: ${response.status}`);
    }
    const data = await response.json();
    window.localStorage.setItem("user_id", data.data.user_id);
    return data;
};
