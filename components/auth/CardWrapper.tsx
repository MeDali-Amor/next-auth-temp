"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Social from "./Social";
import { Button } from "../ui/button";
import Link from "next/link";

type CardWrapperProps = {
    children: React.ReactNode;
    backLinkText: string;
    backLinklabel: string;
    backLinkhref: string;
    headerLabel: string;
    showSocial?: boolean;
};

const CardWrapper = ({
    backLinkText,
    backLinklabel,
    backLinkhref,
    children,
    headerLabel,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <div
                    className="text-sm font-semibold
                pl-4 text-center 
                text-gray-700"
                >
                    {headerLabel}
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className=" justify-center  pb-4">
                <div className="text-xs font-semibold text-black">
                    {backLinkText}{" "}
                </div>
                <Button
                    size={"sm"}
                    className="text-xs decoration-transparent text-indigo-600"
                    variant={"link"}
                >
                    <Link href={backLinkhref}>{backLinklabel}</Link>
                </Button>
            </CardFooter>
            {showSocial && (
                <>
                    <CardFooter className="pb-4">
                        <div className="w-full flex items-center gap-3">
                            <div className="flex-1  h-[1px] border-slate-200 border-[1px]"></div>
                            <div className="text-xs text-slate-400">OR</div>
                            <div className="flex-1  h-[1px] border-slate-200 border-[1px]"></div>
                        </div>
                    </CardFooter>
                    <CardFooter>
                        {/* <div className="w-full flex flex-col gap-4">
                         */}
                        <Social />
                        {/* </div> */}
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default CardWrapper;
