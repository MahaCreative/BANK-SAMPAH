import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import Akun from "./Akun";
import Form from "./Form";
import LihatAnggota from "./LihatAnggota";

export default function Anggota(props) {
    const { data: anggota, meta, links } = props.anggota;

    const lk = props.lk;
    const pr = props.pr;
    const count = props.count;
    console.log(lk);
    const [modelAnggota, setModelAnggota] = useState([null]);
    const [modalAdd, setModalAdd] = useState(false);
    const [lihatModal, setLihatModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [akunModal, setAkunModal] = useState(false);
    const modalLihatHandler = (data) => {
        setModelAnggota(data);
        setLihatModal(true);
    };

    const modalEditHandler = (data) => {
        setModelAnggota(data);
        setEditModal(true);
    };

    const modalDeleteHandler = (data) => {
        setModelAnggota(data);
        setDeleteModal(true);
    };

    const deleteHandler = () => {
        router.delete(route("admin.anggota", { id: modelAnggota.id }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setModelAnggota(null), setDeleteModal(false);
            },
        });
    };

    const modalAkunHandler = (data) => {
        setAkunModal(true);
        setModelAnggota(data.id);
    };

    return (
        <>
            <Authenticated>
                <Header
                    header={"Data Anggota"}
                    message={
                        "Halama data anggota adalah halaman yang digunaka untuk mengatu data seputar anggota bank sampah, untuk dapat menambahkan data silahkan menekan tombol tambah anggota"
                    }
                />
                <LihatAnggota
                    model={modelAnggota}
                    setModel={setModelAnggota}
                    open={lihatModal}
                    close={setLihatModal}
                />

                <Form open={modalAdd} close={setModalAdd}></Form>
                <Form
                    model={modelAnggota}
                    setModel={setModelAnggota}
                    open={editModal}
                    close={setEditModal}
                ></Form>
                <Modal
                    height="h-[20%]"
                    show={deleteModal}
                    close={setDeleteModal}
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
                <Akun
                    model={modelAnggota}
                    open={akunModal}
                    close={setAkunModal}
                />
                <div className="max-h-[310px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    <h3 className="mx-4 mt-4 text-2xl font-roboto text-teal-400 font-extrabold">
                        Total Anggota
                    </h3>
                    <div className="mx-4 bg-gradient-to-br from-emerald-400  to-emerald-400 rounded-md shadow-md shadow-gray-400/50 py-2.5 px-4 flex justify-between items-center">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src="/icon/man.png"
                                alt=""
                                className="h-16 w-16"
                            />
                            <p className="font-sans text-lg font-bold text-white">
                                Total Anggota
                            </p>
                        </div>
                        <div className="mx-4">
                            <h3 className="text-5xl font-bold text-white">
                                {count}
                            </h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mx-4 my-2.5 gap-3">
                        <div className="bg-gradient-to-br from-blue-600  to-cyan-400 rounded-md shadow-md shadow-gray-500/50 py-2.5 px-4 flex justify-between items-center">
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src="/icon/man.png"
                                    alt=""
                                    className="h-16 w-16"
                                />
                                <p className="font-sans text-lg font-bold text-white">
                                    Laki-Laki
                                </p>
                            </div>
                            <div className="mx-4">
                                <h3 className="text-5xl font-bold text-white">
                                    {lk}
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-600 to-pink-500 rounded-md shadow-md shadow-gray-500/50 py-2.5 px-4 flex justify-between items-center">
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src="/icon/woman.png"
                                    alt=""
                                    className="h-16 w-16"
                                />
                                <p className="font-sans text-lg font-bold text-white">
                                    Perempuan
                                </p>
                            </div>
                            <div className="mx-4">
                                <h3 className="text-5xl font-bold text-white">
                                    {pr}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="my-2.5 mx-4 pr-8 w-full flex justify-between items-center gap-3">
                        <Buttons
                            onClick={() => setModalAdd(true)}
                            className={
                                "bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                            }
                        >
                            Tambah Anggota
                        </Buttons>
                        <FilterSearch link={"admin.anggota"} />
                    </div>

                    <div className="my-2.5 mx-4">
                        {anggota.length > 0 ? (
                            anggota.map((item, key) => (
                                <div
                                    className="relative py-8 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                    key={key + 1}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            className="w-24 h-24 content-center"
                                            src={
                                                "/storage/" + item.foto_anggota
                                            }
                                            alt=""
                                        />
                                        <div className="py-2.5">
                                            <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                                {item.nama_anggota}
                                            </h3>
                                            <p className="text-[8pt]">
                                                Tanggal Terdaftar :{" "}
                                                {item.tanggal_terdaftar}
                                            </p>
                                            <p className="text-[8pt]">
                                                Alamat : {item.alamat}
                                            </p>
                                            <p className="text-[8pt]">
                                                Telp : {item.telp}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex absolute bottom-1.5 right-2 gap-1  w-1/2">
                                        {item.user !== null ? (
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
                                            onClick={() =>
                                                modalLihatHandler(item)
                                            }
                                            className={
                                                " bg-gradient-to-br from-teal-700 to-teal-500 text-white"
                                            }
                                        >
                                            Lihat
                                        </Buttons>
                                        <Buttons
                                            type={"button"}
                                            onClick={() =>
                                                modalEditHandler(item)
                                            }
                                            className={
                                                "bg-gradient-to-br from-orange-700 to-orange-500 text-white"
                                            }
                                        >
                                            Edit
                                        </Buttons>
                                        <Buttons
                                            type={"button"}
                                            onClick={() =>
                                                modalDeleteHandler(item)
                                            }
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
                    </div>
                </div>
                <Pagination size="mt-5 px-4" {...{ meta, links }} />
            </Authenticated>
        </>
    );
}
