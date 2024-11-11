"use client";
import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import useCerrentUser from "@/hooks/useCerrentUser";

const Settings = () => {
    const user = useCerrentUser();
    const onClick = () => {
        logout();
    };
    return (
        <div>
            <Button onClick={onClick} variant="outline">
                Log out
            </Button>

            {JSON.stringify(user)}
        </div>
    );
};

export default Settings;
