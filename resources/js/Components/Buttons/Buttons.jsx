import clsx from "clsx";
import React from "react";

export default function Buttons({
    children,
    className,
    size = "w-full",
    ...props
}) {
    return (
        <button
            {...props}
            className={clsx(
                className,
                size,
                "text-[10pt] transition-all duration-300 ease-out py-1.5 px-2.5 rounded-lg shadow-md shadow-gray-400/50"
            )}
        >
            {children}
        </button>
    );
}
