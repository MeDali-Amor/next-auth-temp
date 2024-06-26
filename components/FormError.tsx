import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
    message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
    return message ? (
        <div
            className="bg-destructive/15 p-3 rounded-sm flex items-center
        text-sm text-destructive gap-x-3"
        >
            <ExclamationTriangleIcon className="h-4 w-4" /> {message}
        </div>
    ) : null;
};

export default FormError;
