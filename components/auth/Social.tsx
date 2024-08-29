"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { googleSignIn } from "@/actions/login";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

const Social = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const onClick = (provider: "google") => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            googleSignIn(provider).then((data) => {
                setSuccess(data?.success);
                setError(data?.error);
            });
        });
    };
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button
                disabled={isPending}
                variant={"outline"}
                size={"lg"}
                className="w-full pl-4 flex items-center justify-between"
                onClick={() => onClick("google")}
            >
                <FcGoogle size={"24"} />
                <div className="flex-1">Continue with Google</div>
            </Button>
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
        </div>
    );
};

export default Social;
