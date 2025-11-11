"use client";
import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import useCerrentUser from "@/hooks/useCerrentUser";

const Settings = () => {
    const user = useCerrentUser();

    return <div></div>;
};

export default Settings;
