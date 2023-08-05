import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

import React from "react";
import { useState } from "react";
import Form from "./Form";

export default function KategoriSampah(props) {
    const { data: kategori_sampah, meta, links } = props.kategori_sampah;
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modelSampah, setModelSampah] = useState([null]);

    const editModalHandler = (data) => {
        setModelSampah(data);
        setModalEdit(true);
    };

    const deleteModalHandler = (data) => {
        setModelSampah(data);
        setModalDelete(true);
    };

    const deleteHandler = () => {
        router.delete(route("admin.kategori-sampah", { id: modelSampah.id }), {
            onSuccess: () => {
                setModelSampah([null]), setModalDelete(false);
            },
        });
    };

    return (
        <>
            <Authenticated>
                <Header
                    header={"Data Kategori Sampah"}
                    message={
                        "Kategori sampah di gunakan untuk mengatur jenis sampah yang akan di terima pada sistem informasi bank sampah"
                    }
                />

                <Form open={modalAdd} close={setModalAdd} />
                <Form
                    model={modelSampah}
                    open={modalEdit}
                    close={setModalEdit}
                />
                <Modal
                    height="h-[20%]"
                    show={modalDelete}
                    onClose={() => setModalDelete(false)}
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
                                onClick={() => setDeleteModal(false)}
                                className={
                                    "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                                }
                            >
                                Cacell
                            </Buttons>
                        </div>
                    </div>
                </Modal>

                <div className="my-2.5 px-4 w-full flex justify-between items-center gap-3">
                    <Buttons
                        onClick={() => setModalAdd(true)}
                        className={
                            "bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                        }
                    >
                        Tambah Jenis Sampah
                    </Buttons>
                    <FilterSearch link={"admin.kategori-sampah"} />
                </div>
                <div className="my-2.5 mx-4 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    <div className="">
                        {kategori_sampah.length > 0 ? (
                            kategori_sampah.map((item, key) => (
                                <div
                                    className="relative py-8 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                    key={key + 1}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            className="w-24 h-24 content-center"
                                            src={"/storage/" + item.image}
                                            alt=""
                                        />
                                        <div className="py-2.5">
                                            <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                                {item.nama_kategori}
                                            </h3>
                                            <p className="text-[8pt]">
                                                Harga Jual : {item.harga_jual}
                                            </p>
                                            <p className="text-[8pt]">
                                                Harga Beli : {item.harga_beli}
                                            </p>
                                            <p className="text-[8pt]">
                                                Stok : {item.stok} {item.satuan}
                                            </p>
                                        </div>
                                        <div className="flex absolute bottom-1.5 right-2 gap-1  w-1/2">
                                            <Buttons
                                                onClick={() =>
                                                    editModalHandler(item)
                                                }
                                                className={
                                                    "bg-gradient-to-br from-orange-700 to-orange-500 text-white"
                                                }
                                            >
                                                Edit
                                            </Buttons>
                                            <Buttons
                                                onClick={() =>
                                                    deleteModalHandler(item)
                                                }
                                                className={
                                                    "bg-gradient-to-br from-red-700 to-red-500 text-white"
                                                }
                                            >
                                                Delete
                                            </Buttons>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-2.5 px-4 shadow-md shadow-gray-400/50 rounded-md">
                                <p>Data Tidak Tersedia</p>
                            </div>
                        )}
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
