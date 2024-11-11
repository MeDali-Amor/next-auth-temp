"use client";

import useCerrentUser from "@/hooks/useCerrentUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserMenu = () => {
    const user = useCerrentUser();
    return (
        // <div className="w-12 h-12 cursor-pointer hover:bg-slate-100 rounded-full transition-colors bg-slate-200 flex items-center justify-center border-blue-300 text-slate-600 font-semibold">
        //
        // </div>
        <DropdownMenu>
            <DropdownMenuTrigger className="w-12 h-12 cursor-pointer hover:bg-slate-100 rounded-full transition-colors bg-slate-200 flex items-center justify-center border-blue-300 text-slate-600 font-semibold">
                {user?.name?.[0] ?? "U"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
