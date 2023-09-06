import clsx from "clsx";
import React from "react";

export default function Header({ message, header, size = "h-56" }) {
    return (
        <div
            className={clsx(
                size,
                "w-full my-8 bg-teal-500 py-12 px-4 rounded-b-[20%] relative"
            )}
        >
            <h3 className="text-white font-roboto font-bold text-xl border-b-2 border-white inline">
                {header}
            </h3>
            <p className="text-[8pt]  font-nunito font-extralight text-gray-200">
                {message}
            </p>
        </div>
    );
}
