import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

const Error = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    return (
        <div className="mt-10 flex justify-center items-center min-h-[calc(100vh-2.5rem)] flex-col gap-y-5">
            <p className="font-bold text-3xl">Oops.. Something went wrong.</p>
            <p className="font-bold text-xl">Please try again.</p>
            <Button
                onClick={() => {
                    if (isSignedIn) {
                        console.log("Logged In -> Redirect to dashboard");
                        return navigate("/dashboard");
                    }
                    console.log("Not logged In -> Redirect to /");
                    navigate("/");
                }}
            >
                Go Back to Home
            </Button>
        </div>
    );
};
export default Error;
