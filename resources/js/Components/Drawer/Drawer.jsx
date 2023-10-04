import React, { useEffect, useRef, useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CloseIcon from "@mui/icons-material/Close";
import Buttons from "../Buttons/Buttons";
import clsx from "clsx";
import DropdownMenu from "../Menu/DropdownMenu";
import { Link, usePage } from "@inertiajs/react";
import RefreshIcon from "@mui/icons-material/Refresh";
export default function Drawer() {
    const drawerRef = useRef();
    const { reload } = usePage();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { auth } = usePage().props;
    useEffect(() => {
        let handler = (e) => {
            if (!drawerRef.current.contains(e.target)) {
                setDrawerOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div>
            <div className="bg-white shadow-sm shadow-gray-200/30 px-4 py-2.5 fixed w-full z-[999]">
                <div className="flex justify-between items-center">
                    <div className="font-bold uppercase text-teal-500">
                        Bank Sampah
                    </div>
                    <div className="text-teal-500">
                        {drawerOpen ? (
                            <Buttons onClick={() => setDrawerOpen(false)}>
                                <CloseIcon color="inherit" fontSize="inherit" />
                            </Buttons>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <Buttons
                                    onClick={() => window.location.reload()}
                                >
                                    <RefreshIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </Buttons>
                                <Buttons onClick={() => setDrawerOpen(true)}>
                                    <WidgetsIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </Buttons>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    ref={drawerRef}
                    className={clsx(
                        drawerOpen
                            ? "visible h-[90%]"
                            : "collapse -translate-y-11 opacity-0 h-0",
                        "z-[99] fixed  flex flex-col gap-2 shadow-sm rounded-b-3xl bg-teal-400 shadow-gray-300/50 py-2.5 top-12 left-0 w-full transition-all duration-300 ease-in-out "
                    )}
                >
                    <div className="bg-white px-4 py-2.5">
                        <div className="flex gap-3 ">
                            <img
                                src={
                                    auth.profile
                                        ? "../storage/" +
                                          auth.profile.foto_petugas
                                        : "../images/user.png"
                                }
                                alt=""
                                className="w-24 h-24 object-cover object-center shadow-md shadow-gray-500/50 p-2 rounded-full bg-teal-400"
                            />
                            <div className="py-4">
                                <h3 className="mb-2 text-2xl font-semibold text-teal-400 capitalize">
                                    {auth.profile
                                        ? auth.profile.nama_petugas
                                        : "Petugas"}
                                </h3>
                                <Link
                                    className="mr-2 hover:text-teal-400 font-nunito font-light text-white bg-teal-400 px-4 py-1 rounded-md hover:bg-teal-600"
                                    href={route("ketua.setting-profile")}
                                >
                                    Setting Profile
                                </Link>
                                <Link
                                    as="button"
                                    method="post"
                                    className="hover:text-red-400 font-nunito font-light text-white bg-red-400 px-4 py-1 rounded-md hover:bg-red-600"
                                    href={route("logout")}
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link
                        href={route("dashboard")}
                        className="py-2.5 px-4 bg-teal-500 text-white"
                    >
                        Dashboard
                    </Link>
                    <DropdownMenu name={"Menu Pengguna"}>
                        <DropdownMenu.MenuLink href={route("admin.petugas")}>
                            Data Pengguna
                        </DropdownMenu.MenuLink>
                        {/* <DropdownMenu.MenuLink href={route("admin.anggota")}>
                            Data Anggota
                        </DropdownMenu.MenuLink> */}
                    </DropdownMenu>

                    <DropdownMenu name={"Menu Transaksi"}>
                        <DropdownMenu.MenuLink
                            href={route("ketua.transaksi-pembelian")}
                        >
                            Pembelian Sampah
                        </DropdownMenu.MenuLink>
                        <DropdownMenu.MenuLink
                            href={route("ketua.transaksi-penjualan")}
                        >
                            Penjualan Sampah
                        </DropdownMenu.MenuLink>
                        <DropdownMenu.MenuLink
                            href={route("ketua.transaksi-mutasi")}
                        >
                            Mutasi
                        </DropdownMenu.MenuLink>
                    </DropdownMenu>

                    <DropdownMenu name={"Menu Laporan"}>
                        <DropdownMenu.MenuLink
                            href={route("ketua.laporan-penjualan")}
                        >
                            Penjualan
                        </DropdownMenu.MenuLink>
                        <DropdownMenu.MenuLink
                            href={route("ketua.laporan-pembelian")}
                        >
                            Pembelian
                        </DropdownMenu.MenuLink>
                        <DropdownMenu.MenuLink
                            href={route("ketua.laporan-mutasi")}
                        >
                            Transaksi Mutasi
                        </DropdownMenu.MenuLink>
                    </DropdownMenu>

                    <div
                        onClick={() => setDrawerOpen(false)}
                        className="bottom-0 absolute left-0 text-lg w-full text-center hover:cursor-pointer hover:text-red-500"
                    >
                        close
                    </div>
                </div>
            </div>
        </div>
    );
}
