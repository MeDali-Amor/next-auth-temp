"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../Loader";
import { emailVerification } from "@/actions/verification";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

const VerificationCard = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get("token");
    const handleVerification = useCallback(() => {
        if (!token) {
            return setError("Token not found");
        }
        emailVerification(token)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
                console.log(data);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token]);
    useEffect(() => {
        handleVerification();
    }, [handleVerification]);
    return (
        <CardWrapper
            headerLabel="Verification"
            backLinkText="Go back to "
            backLinkhref="/login"
            backLinklabel="Login"
        >
            {error ? (
                <FormError message={error} />
            ) : success ? (
                <FormSuccess message={success} />
            ) : (
                <>
                    <div
                        className="text-center text-gray-700 font-semibold
            mb-2"
                    >
                        You email is beeing verified
                    </div>
                    <Loader />
                </>
            )}
        </CardWrapper>
    );
};

export default VerificationCard;
