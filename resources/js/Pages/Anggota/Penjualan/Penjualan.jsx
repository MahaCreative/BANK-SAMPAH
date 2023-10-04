import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import { FormatUang } from "@/FormatUang";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Buttons from "@/Components/Buttons/Buttons";
import { router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
export default function Penjualan(props) {
    const penjualan_bulan = props.penjualan_bulan;
    const penjualan_tahun = props.penjualan_tahun;
    const { data: mutasi, meta, links } = props.mutasi;
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [query, setQuery] = useState({ tanggal_awal: "", tanggal_akhir: "" });
    const changeHandler = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value });
    };
    const cariHandler = (e) => {
        router.get(route("anggota.history-penjualan"), query, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setModalFilterDate(false);
            },
        });
    };
    return (
        <div>
            <Modal
                height="h-[40%]"
                show={modalFilterDate}
                onClose={setModalFilterDate}
            >
                <div className="px-4 py-2.5">
                    <h3 className="text-emerald-400 font-bold text-sm">
                        Filter Berdasarkan Tanggal
                    </h3>
                    <InputLabel value={"Tanggal Awal"} />
                    <TextInput
                        handleChange={changeHandler}
                        name="tanggal_awal"
                        className={"block w-full"}
                        type={"date"}
                    />
                    <InputLabel value={"Tanggal Akhir"} />
                    <TextInput
                        handleChange={changeHandler}
                        name="tanggal_akhir"
                        className={"block w-full"}
                        type={"date"}
                    />
                    <div className="my-2">
                        <Buttons
                            onClick={cariHandler}
                            className={"bg-emerald-400 text-white"}
                        >
                            Cari
                        </Buttons>
                    </div>
                </div>
            </Modal>
            <Authenticated>
                <Header
                    header={"Data Penjualan"}
                    message={
                        "Menu ini menampilkan data penjualan Anggota Bank Sampah"
                    }
                />

                <div className="relative ">
                    <div className="flex -bottom-6 left-0 absolute w-full px-4  gap-2 justify-evenly">
                        <div className="px-4 py-2 w-full bg-white rounded-md shadow-sm shadow-gray-300/50 flex justify-between items-center">
                            <div className="flex flex-col ">
                                <img
                                    src="./images/graph_naik.png"
                                    className="h-16 w-16"
                                    alt=""
                                />
                                <p className="w-1/2 text-[8pt] font-bold text-green-400 text-center">
                                    Penjualan Bulan Ini
                                </p>
                            </div>
                            <h3 className="text-lg text-green-400 font-extrabold">
                                {FormatUang(penjualan_bulan)}
                            </h3>
                        </div>
                        <div className="px-4 py-2 w-full bg-white rounded-md shadow-sm shadow-gray-300/50 flex justify-between items-center">
                            <div className="flex flex-col">
                                <img
                                    src="./images/graph_naik.png"
                                    className="h-16 w-16"
                                    alt=""
                                />
                                <p className="w-1/2 text-[8pt] font-bold text-red-400">
                                    Penjualan Tahun Ini
                                </p>
                            </div>
                            <h3 className="text-lg text-red-400 font-extrabold">
                                {FormatUang(penjualan_tahun)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className=" relative mt-16  px-4 ">
                    <div
                        onClick={() => setModalFilterDate(true)}
                        className="mb-2 shadow-sm shadow-gray-400/50 rounded-md py-1.5 px-4 hover:cursor-pointer"
                    >
                        <div className="border-emerald-400 border-b-2 py-1 flex justify-between">
                            <div className="flex gap-3">
                                <img
                                    src="./images/date.png"
                                    className="w-6 h-6"
                                    alt=""
                                />
                                <p>Pilih Tanggal Transaksasi</p>
                            </div>
                            <ArrowForwardIosIcon
                                fontSize="small"
                                color="inherit"
                                className="text-emerald-400"
                            />
                        </div>
                    </div>
                    <h3 className="font-extrabold text-emerald-400 border-b-2 border-emerald-400 inline-block">
                        Data Trasaksi Penjualan Sampah
                    </h3>
                    <div className="my-2"></div>
                    <div className="max-h-[400px]   overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                        {mutasi.length > 0 ? (
                            <div>
                                {mutasi.map((item, key) => (
                                    <div
                                        key={key + 1}
                                        className="px-2 py-1 my-1.5 rounded-lg shadow-sm shadow-gray-400/50"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-md text-emerald-300 font-semibold">
                                                    {item.jenis_mutasi}
                                                </h3>
                                                <p className="text-[8pt] font-light">
                                                    {item.tanggal_mutasi}
                                                </p>
                                                <p className="text-[8pt] capitalize font-light">
                                                    Transaksi By :{" "}
                                                    {
                                                        item.profile_petugas
                                                            .nama_petugas
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10pt] font-light">
                                                    Transaksi: Rp.{" "}
                                                    {FormatUang(
                                                        item.jumlah_mutasi
                                                    )}
                                                </p>
                                                <p className="text-[10pt] font-light">
                                                    Jumlah Saldo : Rp.{" "}
                                                    {FormatUang(item.saldo)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Pagination {...{ meta, links }} />
                            </div>
                        ) : (
                            "Data Tidak Tersedia"
                        )}
                    </div>
                </div>
            </Authenticated>
        </div>
    );
}
