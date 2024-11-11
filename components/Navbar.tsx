"use client";

import UserMenu from "./UserMenu";

const Navbar = () => {
    return (
        <div className="w-full px-4 py-2  bg-emerald-50 flex items-center justify-between">
            <div className="">Auth</div>
            <UserMenu />
        </div>
    );
};

export default Navbar;
