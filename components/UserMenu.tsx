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
import { logout } from "@/actions/logout";
import Link from "next/link";

const UserMenu = () => {
    const user = useCerrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-12 h-12 cursor-pointer hover:bg-slate-100 rounded-full transition-colors bg-slate-200 flex items-center justify-center border-blue-300 text-slate-600 font-semibold">
                {user?.name?.[0] ?? "U"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;

// const cellHoc = (useStyleHook) => ({ ...props }) => {
//     const classes = useStyleHook()
//     const classNames = Object.keys(classes).map(className=>`${className}`).join(' ')
//     return
//     <div className={classNames}></div>
// }
