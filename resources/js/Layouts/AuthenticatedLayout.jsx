import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Drawer from "@/Components/Drawer/Drawer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import DrawerAnggota from "@/Components/Drawer/DrawerAnggota";
import DrawerKasir from "@/Components/Drawer/Drawer.Kasir";
export default function Authenticated({ header, children }) {
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    });
    let drawer = "";
    if (auth.roles === "anggota") {
        drawer = <DrawerAnggota />;
    } else if (auth.roles === "ketua bank sampah") {
        drawer = <Drawer />;
    } else if (auth.roles === "kasir") {
        drawer = <DrawerKasir />;
    }
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Toaster />
            <div>{drawer}</div>
            <div className=" overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                {children}
            </div>
        </div>
    );
}
