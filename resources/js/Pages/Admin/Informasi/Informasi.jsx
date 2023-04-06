import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

export default function Informasi(props) {
    const { data: informasi, meta, links } = props.informasi;
    const [modalDelete, setModalDelete] = useState(false);
    const [modelInformasi, setModelInformasi] = useState([null]);

    const modalDeleteHandler = (data) => {
        setModelInformasi(data);
        setModalDelete(true);
    };

    const deleteHandler = () => {
        router.delete(route("admin.informasi", { id: modelInformasi.id }), {
            onSuccess: () => {
                setModelInformasi([null]), setModalDelete(false);
            },
        });
    };

    return (
        <>
            <Authenticated>
                <Header
                    header={"Data Informasi"}
                    message={
                        "Untuk menambahkan informasi silahkan menambahkan data silahkan menekan tombol tambah"
                    }
                />
                <Head title="Infomasi" />
                <Modal
                    height="h-[18%]"
                    show={modalDelete}
                    onClose={setModalDelete}
                >
                    <div className="my-2.5 mx-4">
                        <h3 className="font-bold text-2xl text-teal-400">
                            Warning!!!
                        </h3>
                        <p>Apakah anda yakin ingin menghapus data?</p>
                        <div className="flex gap-3">
                            <Buttons
                                onClick={deleteHandler}
                                className={
                                    "bg-gradient-to-br from-teal-400 to-green-500 text-white"
                                }
                            >
                                Submit
                            </Buttons>
                            <Buttons
                                onClick={() => setModalDelete(false)}
                                className={
                                    "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                                }
                            >
                                Cacell
                            </Buttons>
                        </div>
                    </div>
                </Modal>

                <div className="my-2.5 mx-4 pr-8 w-full flex justify-between items-center gap-3">
                    <Link
                        href={route("admin.create-informasi")}
                        className={
                            "py-2.5 px-4 rounded-md bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                        }
                    >
                        Tambah Informasi
                    </Link>
                    <FilterSearch link={"admin.informasi"} />
                </div>

                <div className="my-2.5 mx-4">
                    {informasi.length > 0 ? (
                        informasi.map((item, key) => (
                            <div
                                className="relative py-8 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                key={key + 1}
                            >
                                <div className="flex gap-3">
                                    <img
                                        className="w-24 h-24 content-center"
                                        src={
                                            "/storage/" + item.gambar_informasi
                                        }
                                        alt=""
                                    />
                                    <div className="py-2.5 w-[80%]">
                                        <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                            {item.judul}
                                        </h3>
                                        <p className="text-[8pt]">
                                            Tanggal Release :{" "}
                                            {item.tanggal_release}
                                        </p>
                                        <p className="text-[8pt]">
                                            Post By :{" "}
                                            {item.profile_petugas.nama_petugas}
                                        </p>
                                        <p className="text-[8pt] w-[100%]">
                                            {" "}
                                            {item.deskripsi_singkat}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex absolute bottom-1.5 right-2 gap-1  w-1/2">
                                    <Link
                                        href={route("informasi", item.slug)}
                                        className={
                                            " text-[10pt] transition-all duration-300 ease-out py-1.5 px-2.5 rounded-lg shadow-md shadow-gray-400/50 bg-gradient-to-br from-teal-700 to-teal-500 text-white"
                                        }
                                    >
                                        Lihat
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.show-informasi",
                                            item.slug
                                        )}
                                        className={
                                            "text-[10pt] transition-all duration-300 ease-out py-1.5 px-2.5 rounded-lg shadow-md shadow-gray-400/50 bg-gradient-to-br from-orange-700 to-orange-500 text-white"
                                        }
                                    >
                                        Edit
                                    </Link>
                                    <Buttons
                                        onClick={() => modalDeleteHandler(item)}
                                        className={
                                            "bg-gradient-to-br from-red-700 to-red-500 text-white"
                                        }
                                    >
                                        Delete
                                    </Buttons>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-2.5 px-4 shadow-md shadow-gray-400/50 rounded-md">
                            <p>Data Tidak Tersedia</p>
                        </div>
                    )}
                    <Pagination {...{ meta, links }} />
                </div>
            </Authenticated>
        </>
    );
}
