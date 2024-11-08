"use client";

import React from "react";

const Loader = () => {
    return (
        <section className="flex items-center justify-center h-full w-full space-x-2">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="h-4 w-4 rounded-full bg-blue-300 animate-pulse"
                    style={{
                        animationDelay: `${index * 0.2 - 0.3}s`, // Delay based on index
                    }}
                />
            ))}
        </section>
    );
};

export default Loader;
