import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";

export default function Penjualan(props) {
    const { data: penjualan, meta, links } = props.penjualan;
    const [lihatModal, setLihatModal] = useState(false);
    const [dataPenjualan, setDataPenjualan] = useState(null);
    const lihatModalHandler = (item) => {
        setDataPenjualan(item);
        setLihatModal(true);
    };
    console.log(dataPenjualan);
    return (
        <div>
            <Authenticated>
                <Modal show={lihatModal} onClose={setLihatModal}>
                    <div className="my-16 mx-4">
                        <h3 className="text-xl text-teal-400 font-bold">
                            Data Penjualan
                        </h3>
                        {dataPenjualan &&
                            dataPenjualan.detail_penjualan.map((item, key) => (
                                <div
                                    key={key + 1}
                                    className="hover:cursor-pointer hover:bg-teal-200 my-2.5 mx-4 flex gap-3 shadow-md shadow-gray-400 border border-gray-400/50 py-2.5 px-2 rounded-md"
                                >
                                    <img
                                        className="w-24 h-24 content-center"
                                        src={
                                            "/storage/" +
                                            item.kategori_sampah.image
                                        }
                                        alt=""
                                    />
                                    <div className="py-2.5 w-full">
                                        <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                            {item.kategori_sampah.nama_kategori}
                                        </h3>
                                        <p
                                            name={"jumlah"}
                                            className="text-[8pt]"
                                        >
                                            Harga Jual :{" "}
                                            {item.kategori_sampah.harga_jual} /{" "}
                                            {item.kategori_sampah.satuan}
                                        </p>
                                        {/* <TextInput value={item.jumlah} name={'jumlah'} handleChange={(e) => change(e, item)} min={1} max={99} type={'number'} className={'block w-full my-1.5'} placeholder={item.jumlah}/> */}
                                        <p className="text-[8pt]">
                                            Sub Total :{" "}
                                            {item.jumlah *
                                                item.kategori_sampah.harga_jual}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Modal>
                <Header
                    header={"Data Penjualan"}
                    message={
                        "Halaman ini digunakan oleh admin untuk menambahkan transaksi penjualan sampah baru ke pengepul. Halaman ini digunakan untuk menampilkan informasi penjualan yang terjadi pada sistem informasi"
                    }
                />
                <div className="max-h-[370px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    <div className="mx-4 my-1.5 flex justify-between items-center gap-3">
                        <Link
                            href={route("admin.create-penjualan")}
                            className={
                                "py-2 px-2 rounded-md bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                            }
                        >
                            Tambah Penjualan
                        </Link>
                        <FilterSearch link={"admin.petugas"} />
                    </div>
                    <div className="mx-4 my-1.5 ">
                        {penjualan.length > 0 ? (
                            penjualan.map((item, key) => (
                                <div
                                    key={key + 1}
                                    className="relative h-40 py-2.5 px-4 rounded-md shadow-md shadow-gray-400/50"
                                >
                                    <h3 className="text-teal-400 font-bold text-sm">
                                        Kode Penjualan : {item.no_penjualan}
                                    </h3>
                                    <p className="text-sm font-light">
                                        Tanggal Penjualan :
                                        {item.tanggal_penjualan}{" "}
                                    </p>
                                    <p className="text-sm font-light">
                                        Penjualan Oleh :{" "}
                                        {item.profile_petugas.nama_petugas}
                                    </p>
                                    <p className="text-sm font-light">
                                        Total Penjualn :{" "}
                                        <CurrencyFormat
                                            type="text"
                                            prefix="Rp. "
                                            thousandSeparator={true}
                                            value={item.total_penjualan}
                                        />
                                    </p>
                                    <div className="flex absolute bottom-1.5 right-2 gap-1  w-1/2">
                                        <Buttons
                                            onClick={() =>
                                                lihatModalHandler(item)
                                            }
                                            type={"button"}
                                            className={
                                                " bg-gradient-to-br from-teal-700 to-teal-500 text-white"
                                            }
                                        >
                                            Lihat Penjualan
                                        </Buttons>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Data Penjualan Kosongg</div>
                        )}
                    </div>
                </div>
            </Authenticated>
        </div>
    );
}
