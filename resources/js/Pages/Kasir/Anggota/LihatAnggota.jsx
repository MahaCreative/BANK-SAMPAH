import Buttons from "@/Components/Buttons/Buttons";
import Modal from "@/Components/Modal";
import React from "react";

export default function LihatAnggota({ model, setModel, open, close }) {
    const closeHandler = () => {
        setModel([null]);
        close(false);
    };
    return (
        <div>
            <Modal className={"w-full"} show={open} onClose={close}>
                {model && (
                    <>
                        <div className="w-full py-2 px-4">
                            <img
                                src={"./storage/" + model.foto_anggota}
                                alt=""
                                className="w-full h-48 object-cover object-top "
                            />
                            <div className="my-2.5">
                                <h3 className="text-2xl font-semibold text-teal-400 inline-block border-b-4 border-teal-400">
                                    {model.nama_anggota}
                                </h3>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">NIK</p>
                                    <p>: {model.nik}</p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">KK</p>
                                    <p>: {model.kk}</p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">Alamat</p>
                                    <p>: {model.alamat}</p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">
                                        Tempat Tanggal Lahir
                                    </p>
                                    <p>
                                        : {model.tempat_lahir}{" "}
                                        {model.tanggal_lahir}
                                    </p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">
                                        Tanggal Terdaftar
                                    </p>
                                    <p>: {model.tanggal_terdaftar}</p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">Nama Rekening</p>
                                    <p>: {model.nama_rekening}</p>
                                </div>
                                <div className="flex gap-3 border-b border-teal-400 py-2">
                                    <p className="w-[100px]">Nomor Rekening</p>
                                    <p>: {model.no_rekening}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end w-full px-4 py-2.5">
                            <Buttons
                                onClick={closeHandler}
                                className={
                                    "w-24 bg-gradient-to-bl from-red-500 to-orange-600"
                                }
                            >
                                Close
                            </Buttons>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
}
