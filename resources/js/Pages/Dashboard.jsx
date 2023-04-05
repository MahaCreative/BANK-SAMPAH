import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {/* Section Menu */}
            <div className="w-full bg-teal-500 h-56 py-12 px-4 rounded-b-[20%] relative">
                <div>
                    <p className="text-white font-extralight text-sm">
                        Selamat Datang
                    </p>
                    <p className="text-white font-sans font-bold text-2xl">
                        Guntur Madjid
                    </p>
                </div>
                <div className="absolute -bottom-20 left-0 bg-white mx-4 rounded-md shadow-sm shadow-gray-300/50 flex items-center">
                    <div className="flex">
                        <div>
                            <h3 className="text-sm font-bold capitalize px-4 py-2.5">
                                tukarkan sampah plastikmu sekarang
                            </h3>
                            <p className="text-[10pt] font-light px-4 pb-2.5">
                                Aplikasi bank sampah adalah solusi untuk
                                menyelesaikan masalah sosial tentang kebersihan
                                lingkungan
                            </p>
                        </div>
                    </div>
                    <div className="px-4">
                        <img
                            src="/images/ic_logo.png"
                            alt=""
                            className="w-96"
                        />
                    </div>
                </div>
            </div>

            <div className="relative mt-24 px-4 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                <h3 className="font-semibold border-b border-teal-400 inline my-2">
                    Menu Pengguna
                </h3>
                {/* Menu Kepala Koperasi */}
                <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/user.png" alt="" />
                        <p className="text-sm">Kelola Pengguna</p>
                    </div>
                    <Link
                        href={route("admin.anggota")}
                        className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100"
                    >
                        <img src="/images/user.png" alt="" />
                        <p className="text-sm">Kelola Anggota</p>
                    </Link>
                </div>

                <h3 className="font-semibold border-b border-teal-400 inline my-2">
                    Menu Umum
                </h3>

                <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/ic_kategori.png" alt="" />
                        <p className="text-sm">Kategori Sampah</p>
                    </div>
                    <div className="relative py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/informasi.png" alt="" />
                        <p className="text-sm absolute bottom-2 left-0 w-full">
                            Informasi
                        </p>
                    </div>
                </div>

                <h3 className="font-semibold border-b border-teal-400 inline my-2">
                    Menu Transaksi
                </h3>

                <div className="grid grid-cols-3 gap-2 my-2">
                    <div className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/ic_recycle.png" alt="" />
                        <p className="text-sm">Pembelian Sampah</p>
                    </div>
                    <div className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/ic_truk.png" alt="" />
                        <p className="text-sm">Penjualan Sampah</p>
                    </div>
                    <div className="py-2.5 px-2 rounded-sm shadow-sm shadow-gray-200 text-center hover:cursor-pointer hover:bg-gray-100">
                        <img src="/images/mutasi.png" alt="" />
                        <p className="text-sm">Transaksi Mutasi</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
