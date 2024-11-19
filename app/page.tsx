import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400","500","600",
         "700"],
});

export default function Home() {
    return (
        <main className="h-full flex items-center justify-center bg-stone-100">
            <div className="">
                <h1
                    className={cn(
                        "text-6xl font-bold text-slate-800 text-center",
                        font.className
                    )}
                >
                    🔐Auth For Your App
                </h1>
                <p
                    className={cn(
                        "text-center p-8 text-base font-medium text-slate-700",
                        font.className
                    )}
                >
                    A complete authentication advanced workflow for your app
                </p>
                <div className="w-full flex items-center justify-center">
                    <LoginButton>
                        <Button variant={"secondary"}>Sign in</Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    );
}
