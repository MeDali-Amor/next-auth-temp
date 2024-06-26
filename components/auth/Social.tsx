"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button
                variant={"outline"}
                size={"lg"}
                className="w-full pl-4 flex items-center justify-between"
                onClick={() => {}}
            >
                <FcGoogle size={"24"} />
                <div className="flex-1">Continue with Google</div>
            </Button>
        </div>
    );
};

export default Social;
