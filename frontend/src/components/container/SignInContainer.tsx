import { SignIn } from "@clerk/clerk-react";

const SignInContainer = () => {
    return (
        <div className="flex w-full justify-center min-h-screen items-center">
            <SignIn />
        </div>
    );
};
export default SignInContainer;
