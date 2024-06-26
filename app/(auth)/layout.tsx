import React from "react";

const authLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen ">
            {/* <div className="w-full  flex items-center justify-between px-7 py-4 bg-violet-400">
                <div className="text-white">hello</div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost">
                        <Link href={"login"}>Login</Link>
                    </Button>
                    <Button variant="link">
                        <Link href={"/register"}>Register</Link>
                    </Button>
                </div>
            </div> */}
            <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default authLayout;
