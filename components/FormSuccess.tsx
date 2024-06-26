import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormSuccessProps = {
    message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
    return message ? (
        <div
            className="bg-emerald-500/15 p-3 rounded-sm flex items-center
        text-sm text-emerald-500 gap-x-3"
        >
            <CheckCircledIcon className="h-4 w-4" /> {message}
        </div>
    ) : null;
};

export default FormSuccess;
