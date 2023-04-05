import Header from "@/Components/Header";
import { FormatUang } from "@/FormatUang";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Dashboard(props) {
    const penarikan = props.penarikan;
    const pemasukan = props.pemasukan;
    const saldo = props.saldo;
    const { auth } = usePage().props;
    console.log(saldo);
    return (
        <div>
            <Authenticated>
                {/* Section Menu */}
                <div className="w-full bg-teal-500 h-56 pt-12 px-4 rounded-b-[20%] relative">
                    <div>
                        <p className="text-white font-extralight text-sm">
                            Selamat Datang
                        </p>
                        <p className="text-white font-sans font-bold text-2xl">
                            {auth.profile.nama_anggota}
                        </p>
                        <div className="flex flex-col items-center justify-center text-white my-2">
                            <h3>Saldo Tabungan Anda</h3>
                            <h3 className="text-lg font-bold">
                                Rp. {FormatUang(saldo)}
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-evenly">
                        <div className="px-4 py-2 w-full bg-white rounded-md shadow-sm shadow-gray-300/50 flex justify-between items-center">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src="/images/graph_naik.png"
                                    className="h-16 w-16"
                                    alt=""
                                />
                                <p className="text-green-400">Pemasukan</p>
                            </div>
                            <h3 className="text-lg text-green-400 font-extrabold">
                                Rp. {FormatUang(pemasukan)}
                            </h3>
                        </div>
                        <div className="px-4 py-4 w-full bg-white rounded-md shadow-sm shadow-gray-300/50 flex justify-between items-center">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src="/images/graph_turun.png"
                                    className="h-16 w-16"
                                    alt=""
                                />
                                <p className="text-red-400">Pengeluaran</p>
                            </div>
                            <h3 className="text-lg text-red-400 font-extrabold">
                                Rp. {FormatUang(penarikan)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="relative mt-16 px-4 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    <h3 className="font-semibold border-b border-teal-400 inline my-2">
                        Menu
                    </h3>

                    <div className="grid grid-cols-4 gap-2 my-2">
                        <Link
                            href={route("anggota.kategori-sampah")}
                            as="div"
                            className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                        >
                            <img src="/images/ic_kategori.png" alt="" />
                            <p className="text-sm">Kategori Sampah</p>
                        </Link>
                        <Link
                            href={route("informasi")}
                            as="div"
                            className="relative py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                        >
                            <img src="/images/informasi.png" alt="" />
                            <p className="text-sm absolute bottom-2 left-0 w-full">
                                Informasi
                            </p>
                        </Link>
                        <Link
                            as="div"
                            href={route("anggota.history-penjualan")}
                            className="relative py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                        >
                            <img src="/images/ic_recycle.png" alt="" />
                            <p className="text-sm absolute bottom-2 left-0 w-full">
                                History Penjualan
                            </p>
                        </Link>
                        <Link
                            href={route("anggota.history-penarikan")}
                            as="div"
                            className="relative py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                        >
                            <img src="/images/mutasi.png" alt="" />
                            <p className="text-sm absolute bottom-2 left-0 w-full">
                                History Penarikan
                            </p>
                        </Link>
                        <Link
                            href={route("anggota.history-mutasi")}
                            as="div"
                            className="col-span-4 relative py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                        >
                            <img src="/images/mutasi.png" alt="" />
                            <p className="text-sm absolute bottom-2 left-0 w-full">
                                History Mutasi
                            </p>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-2 my-2"></div>
                </div>
            </Authenticated>
        </div>
    );
}
