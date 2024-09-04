import { useSearchParams } from "next/navigation";

const useAuthError = () => {
    const params = useSearchParams();
    const urlError =
        params.get("error") === "OAuthAccountNotLinked"
            ? "This email is already use with Google login, please try logging in with Google login."
            : "";

    return { urlError };
};

export default useAuthError;
