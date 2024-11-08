import { useSearchParams } from "next/navigation";

const useAuthError = () => {
    const params = useSearchParams();
    const urlError =
        params.get("error") === "OAuthAccountNotLinked"
            ? "This email is already use with a different provider."
            : "";

    return { urlError };
};

export default useAuthError;
