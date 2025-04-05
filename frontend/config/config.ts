const ENV = "DEV";
const API_BASE_URL = ENV === "DEV" ? "http://localhost:8000/" : "";

export const config = {
    ENV,
    API_BASE_URL,
};
