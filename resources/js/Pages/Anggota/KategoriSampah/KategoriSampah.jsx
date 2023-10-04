import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination";
import { FormatUang } from "@/FormatUang";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function KategoriSampah(props) {
    const { data: kategori_sampah, meta, links } = props.kategori_sampah;
    return (
        <div>
            <Authenticated>
                <Header
                    header={"Daftar Sampah "}
                    message={
                        "Data sampah yang ada dibawah ini merupakan data sampah yang diterima oleh Bank Sampah Mamuju Keren"
                    }
                    size="h-40"
                ></Header>
                <div className="py-1.5 px-4">
                    <FilterSearch link={"anggota.kategori-sampah"} />
                </div>
                <div className="bg-white  my-1.5 px-4 max-h-[330px] rounded-md overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200 py-2 mx-4 scro shadow-md shadow-gray-400/50">
                    <div className="">
                        {kategori_sampah.length > 0 ? (
                            kategori_sampah.map((item, key) => (
                                <div
                                    className="relative py-2 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                    key={key + 1}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            className="w-20 h-20 content-center"
                                            src={"./storage/" + item.image}
                                            alt=""
                                        />
                                        <div className="py-1.5">
                                            <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                                {item.nama_kategori}
                                            </h3>
                                            <p className="text-[8pt]">
                                                Harga Jual : Rp.{" "}
                                                {FormatUang(item.harga_jual)}
                                            </p>
                                            <p className="text-[8pt]">
                                                Harga Beli : Rp.{" "}
                                                {FormatUang(item.harga_beli)}
                                            </p>
                                            <p className="text-[8pt]">
                                                Stok : {item.stok} {item.satuan}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-1.5 px-4 shadow-md shadow-gray-400/50 rounded-md">
                                <p>Data Tidak Tersedia</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="px-4">
                    <Pagination size="mt-2" {...{ meta, links }} />
                </div>
            </Authenticated>
        </div>
    );
}
