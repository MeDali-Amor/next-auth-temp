import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <div className="w-full ">
                <Navbar />
                <div className="">{children}</div>
            </div>
        </SessionProvider>
    );
};

export default layout;
