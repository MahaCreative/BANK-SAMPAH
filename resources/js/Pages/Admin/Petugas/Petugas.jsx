import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Akun from "./Akun";
import Form from "./Form";

export default function Petugas(props) {
    const { data: petugas, meta, links } = props.petugas;
    const [modelPetugas, setModelPetugas] = useState([null]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [akunModal, setAkunModal] = useState(false);

    const editHandler = (data) => {
        setModelPetugas(data);
        setModalEdit(true);
    };
    const deleteHandler = (data) => {
        setModelPetugas(data);
        setModalDelete(true);
    };

    const deleteClickHandler = (e) => {
        router.delete(route("admin.petugas", { id: modelPetugas.id }), {
            onSuccess: () => {
                setModalDelete(false);
                setModelPetugas([null]);
            },
        });
    };

    const modalAkunHandler = (data) => {
        setAkunModal(true);
        setModelPetugas(data.id);
    };
    console.log(petugas);
    return (
        <div>
            <Authenticated>
                <Header
                    header={"Data Petugas"}
                    message={
                        "Menu ini menampilkan data petugas dari bank sampah. untuk dapat menambahkan petugas silahkan menekan tombol tambah dibawah"
                    }
                />
                <Head title="Data Petugas" />
                <Form open={modalAdd} close={setModalAdd} />
                <Form
                    model={modelPetugas}
                    setModel={setModelPetugas}
                    open={modalEdit}
                    close={setModalEdit}
                />

                <Modal
                    height="h-[20%]"
                    show={modalDelete}
                    close={setModalDelete}
                >
                    <div className="my-2.5 mx-4">
                        <h3 className="font-bold text-2xl text-teal-400">
                            Warning!!!
                        </h3>
                        <p>Apakah anda yakin ingin menghapus data?</p>
                        <div className="flex gap-3">
                            <Buttons
                                type={"button"}
                                onClick={deleteClickHandler}
                                className={
                                    "bg-gradient-to-br from-teal-400 to-green-500 text-white"
                                }
                            >
                                Submit
                            </Buttons>
                            <Buttons
                                type={"button"}
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

                <Akun
                    model={modelPetugas}
                    open={akunModal}
                    close={setAkunModal}
                />

                <div className="mx-4 my-2.5 flex justify-between items-center gap-3">
                    <Buttons
                        type={"button"}
                        onClick={() => setModalAdd(true)}
                        className={
                            "bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                        }
                    >
                        Tambah Anggota
                    </Buttons>
                    <FilterSearch link={"admin.petugas"} />
                </div>
                <div className="max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    {petugas.length > 0 ? (
                        petugas.map((item, key) => (
                            <div
                                className="relative py-8 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                key={key + 1}
                            >
                                <div className="flex gap-3">
                                    <img
                                        className="w-24 h-24 content-center"
                                        src={"/storage/" + item.foto_petugas}
                                        alt=""
                                    />
                                    <div className="py-2.5">
                                        <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                            {item.nama_petugas}
                                        </h3>
                                        <p className="text-[8pt] capitalize">
                                            Kode Petugas : {item.kd_petugas}
                                        </p>
                                        <p className="text-[8pt] capitalize">
                                            Alamat : {item.alamat}
                                        </p>
                                        <p className="text-[8pt] capitalize">
                                            Telp : {item.no_telp}
                                        </p>
                                        <p className="capitalize">
                                            Status Akun :{" "}
                                            {item.user &&
                                                item.user.roles[0].name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex absolute bottom-1.5 right-2 gap-1  w-1/2">
                                    {item.user ? (
                                        ""
                                    ) : (
                                        <Buttons
                                            type={"button"}
                                            onClick={() =>
                                                modalAkunHandler(item)
                                            }
                                            className={
                                                " bg-gradient-to-br from-cyan-500 to-green-500 text-white text-[6pt]"
                                            }
                                        >
                                            Create Akun
                                        </Buttons>
                                    )}
                                    <Buttons
                                        type={"button"}
                                        onClick={() => editHandler(item)}
                                        className={
                                            "bg-gradient-to-br from-orange-700 to-orange-500 text-white"
                                        }
                                    >
                                        Edit
                                    </Buttons>
                                    {item.user &&
                                        item.user.roles[0] !==
                                            "ketua bank sampah" && (
                                            <Buttons
                                                type={"button"}
                                                onClick={() =>
                                                    deleteHandler(item)
                                                }
                                                type={"button"}
                                                className={
                                                    "bg-gradient-to-br from-red-700 to-red-500 text-white"
                                                }
                                            >
                                                Delete
                                            </Buttons>
                                        )}
                                    {item.user == null && (
                                        <Buttons
                                            type={"button"}
                                            onClick={() => deleteHandler(item)}
                                            type={"button"}
                                            className={
                                                "bg-gradient-to-br from-red-700 to-red-500 text-white"
                                            }
                                        >
                                            Delete
                                        </Buttons>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-2.5 px-4 shadow-md shadow-gray-400/50 rounded-md">
                            <p>Data Tidak Tersedia</p>
                        </div>
                    )}
                </div>
                <Pagination {...{ meta, links }} />
            </Authenticated>
        </div>
    );
}
