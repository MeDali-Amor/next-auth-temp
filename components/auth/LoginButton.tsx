"use client";

import { useRouter } from "next/navigation";
import React from "react";

type LoginButtonProps = {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
};

export const LoginButton = ({
    children,
    asChild,
    mode = "redirect",
}: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/login");
    };
    return (
        <div className="" onClick={onClick}>
            {children}
        </div>
    );
};
