import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Score = () => {
    const navigate = useNavigate();
    const [savedScore, setSavedScore] = useState<number | null>(null);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem("surveyScore");
            if (stored === null) throw Error("Score is not stored.");
            const score = parseInt(stored);
            if (isNaN(score)) throw Error("Score is not a number.");
            setSavedScore(score);
        } catch (error) {
            console.error(error);
            navigate("/error");
        }
    }, [navigate]);

    const getAdviceMessage = (score: number) => {
        if (score <= 24) {
            return "You seem to be doing well emotionally. Keep up the good habits that support your mental health, such as regular sleep, staying active, and connecting with loved ones.";
        } else if (score <= 49) {
            return "You may be experiencing some low moods or stress. Try incorporating self-care routines, journaling, or talking with a trusted friend. If feelings persist, consider speaking with a counselor.";
        } else if (score <= 74) {
            return "It's important to pay attention to how you're feeling. You're not alone — reaching out to a mental health professional could help you better understand and manage these emotions.";
        } else {
            return "Your score suggests you may be facing serious emotional challenges. Please consider talking to a mental health professional as soon as possible. Support is available, and you're not alone in this.";
        }
    };

    return (
        <div className="mt-10 flex justify-center items-center min-h-[calc(100vh-2.5rem)] flex-col gap-y-5 text-center px-4">
            <h1 className="text-2xl font-semibold">
                Your score of depression based on the survey:
            </h1>
            {savedScore !== null && (
                <>
                    <h2 className="text-4xl font-bold">{savedScore}</h2>
                    <p className="max-w-xl text-lg">{getAdviceMessage(savedScore)}</p>
                </>
            )}
            <Button onClick={() => navigate("/dashboard")}>Go Back to Dashboard</Button>
        </div>
    );
};

export default Score;
