import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import { Link } from "@inertiajs/react";
import Dropdown from "../Dropdown";
function DropdownMenu({ name,children }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div>
            <div
                ref={menuRef}
                className={clsx(
                    open ? "" : "min-h-9 max-h-11",
                    "capitalize w-full bg-teal-500 px-2.5 py-2.5 text-white hover:cursor-pointer duration-100 overflow-hidden transition-all"
                )}
                onClick={() => setOpen(!open)}
            >
                <div className="flex justify-between items-center">
                    <div>{name}</div>
                    <div
                        className={clsx(
                            open ? "rotate-180" : "rotate-0",
                            " duration-100 transition-all ease-in-out"
                        )}
                    >
                        <ExpandMoreIcon fontSize="inherit" color="inherit" />
                    </div>
                </div>
                <div
                    className={clsx(
                        open ? "visible opacity-100" : "collapse",
                        " w-full duration-100 transition-all ease-in-out overflow-hidden"
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function Button({ children, ...props }) {
    return (
        <button className="block w-full text-left py-1.5 px-2.5 hover:bg-green-300">
            {children}
        </button>
    );
}

function MenuLink({children,href, ...props}){
    return (
        <Link href={href} className="block w-full text-left py-1.5 px-2.5 hover:bg-green-300">
            {children}
        </Link>
    )
}

DropdownMenu.Button = Button;
DropdownMenu.MenuLink = MenuLink;
export default DropdownMenu;
