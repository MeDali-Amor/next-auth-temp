import CardWrapper from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AuthErrorPage = () => {
    return (
        <>
            <CardWrapper
                headerLabel="Sorry, an error have occured!"
                backLinkText="Back to login"
                backLinkhref="/login"
                backLinklabel="Login"
            >
                <div className="w-full flex justify-center items-center">
                    <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
                </div>
            </CardWrapper>
        </>
    );
};

export default AuthErrorPage;
