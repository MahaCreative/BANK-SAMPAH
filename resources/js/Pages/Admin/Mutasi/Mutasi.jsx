import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FormatUang } from "@/FormatUang";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import moment from "moment";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { router, useForm, usePage } from "@inertiajs/react";
import CurrencyFormat from "react-currency-format";
export default function Mutasi(props) {
    const { auth } = usePage().props;

    const { data: mutasi, links, meta } = props.mutasi;
    const anggota = props.anggota;
    const date = props.date;
    const kd_mutasi = props.kd_mutasi;
    const [modalError, setModalError] = useState(false);
    const [modalSelectAnggota, setModalSelectAnggota] = useState(false);
    const [modalPenarikan, setModalPenarikan] = useState(false);
    const [dataAnggota, setDataAnggota] = useState(null);
    const pilihAnggota = (data) => {
        console.log(data);
        setDataAnggota(data);
        setModalSelectAnggota(false);
        setTimeout(() => {
            setModalPenarikan(true);
        }, 200);
    };
    const { data, setData, reset } = useForm({
        id_anggota: "",
        kd_mutasi: kd_mutasi,
        nama_anggota: "",
        nama_petugas: "",
        saldo: "",
        besar_penarikan: "",
        sisa_saldo: "",
    });

    const changeHandler = (e) => {
        let penarikan = e.target.value;
        penarikan = penarikan.replace("Rp. ", "");
        penarikan = penarikan.replace(",", "").replace(".", "");
        let sisa_saldo = data.saldo - penarikan;
        if (sisa_saldo < 0) {
            setModalError(true);
        } else {
            setData({
                ...data,
                besar_penarikan: penarikan,
                sisa_saldo: sisa_saldo,
            });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        router.post(route("admin.create-mutasi"), data, {
            onSuccess: () => {
                reset("sisa_saldo", "besar_penarikan");
                setTimeout(() => {
                    setModalPenarikan(false);
                }, 200);
            },
        });
    };

    useEffect(() => {
        console.log(dataAnggota);
        setData({
            ...data,
            id_anggota: dataAnggota ? dataAnggota.id : "",
            kd_mutasi: kd_mutasi,
            nama_anggota: dataAnggota ? dataAnggota.nama_anggota : "",
            nama_petugas: auth.profile.nama_petugas,
            saldo: dataAnggota
                ? Object.keys(dataAnggota.mutasi).length > 0
                    ? dataAnggota.mutasi[0].saldo
                    : 0
                : 0,
            sisa_saldo: data.saldo,
        });
    }, [dataAnggota]);

    return (
        <div>
            <Modal
                height="min-h-[22%]"
                show={modalError}
                onClose={setModalError}
            >
                <div className="my-2 mx-4">
                    <h3 className="font-bold text-red-500 text-2xl">Error</h3>
                    <p>Penarikan tidak boleh melebihi batas saldo yang.</p>
                    <Buttons
                        onClick={() => setModalError(false)}
                        className={
                            "bg-gradient-to-br from-red-500 to-orange-400 text-white"
                        }
                    >
                        Cancell
                    </Buttons>
                </div>
            </Modal>
            <Modal show={modalPenarikan} onClose={setModalPenarikan}>
                <div className="px-2 py-2">
                    <h3 className="text-xl text-teal-400 font-bold">
                        Transaksi Penarikan Anggota
                    </h3>
                    <div className="my-2 flex justify-between px-2 border-b border-emerald-500/40">
                        <p className="text-[8pt]">
                            Kode Penarikan : {kd_mutasi}
                        </p>
                        <p className="text-[8pt]">Tanggal Penarikan :{date}</p>
                    </div>
                    <h3 className=" text-teal-400 font-bold">
                        Data Penarikan Anggota
                    </h3>
                    <form action="" onSubmit={submitHandler}>
                        <div className="w-full">
                            <InputLabel
                                forInput={"nama_anggota"}
                                value={"Nama Anggota"}
                            />
                            <TextInput
                                value={data.nama_anggota}
                                name={"nama_anggota"}
                                className={"block w-full mt-1.5"}
                                placeholder="Nama Anggota"
                                disabled
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                forInput={"nama_petugas"}
                                value={"Nama Petugas"}
                            />
                            <TextInput
                                value={data.nama_petugas}
                                name={"nama_petugas"}
                                className={"block w-full mt-1.5"}
                                placeholder="Nama Anggota"
                                disabled
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                forInput={"saldo"}
                                value={"Saldo Anggota"}
                            />
                            <CurrencyFormat
                                className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                disabled={true}
                                prefix="Rp. "
                                thousandSeparator={true}
                                value={data.saldo}
                                name={"saldo"}
                                placeholder="Nama Anggota"
                            />
                            {/* <TextInput
                                value={data.saldo}
                                name={"saldo"}
                                className={"block w-full mt-1.5"}
                                placeholder="Nama Anggota"
                                disabled
                            /> */}
                        </div>
                        <div className="w-full">
                            <InputLabel
                                forInput={"besar_penarikan"}
                                value={"Besar Penarikan"}
                            />

                            <CurrencyFormat
                                className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                prefix="Rp. "
                                thousandSeparator={true}
                                disabled={data.saldo > 0 ? false : true}
                                name={"besar_penarikan"}
                                placeholder={
                                    data.saldo > 0
                                        ? "Besar Penarikan"
                                        : "Tidak Dapat Melakukan Penarikan"
                                }
                                onChange={changeHandler}
                            />
                            {/* {errors.besar_penarikan && (
                                <InputError message={errors.besar_penarikan} />
                            )} */}
                        </div>
                        <div className="w-full">
                            <InputLabel
                                forInput={"sisa_saldo"}
                                value={"Sisa Saldo"}
                            />
                            <CurrencyFormat
                                className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                prefix="Rp. "
                                value={data.sisa_saldo}
                                thousandSeparator={true}
                                name={"sisa_saldo"}
                                placeholder="Besar Penarikan"
                            />
                        </div>
                        <div className="flex justify-between gap-3">
                            <Buttons
                                className={
                                    "my-2 bg-gradient-to-br from-green-500 to-cyan-400 text-white"
                                }
                            >
                                Submit
                            </Buttons>
                            <Buttons
                                onClick={() => setModalPenarikan(false)}
                                type={"button"}
                                className={
                                    "my-2 bg-gradient-to-br from-red-500 to-orange-400 text-white"
                                }
                            >
                                Cancell
                            </Buttons>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal show={modalSelectAnggota} onClose={setModalSelectAnggota}>
                <div className="mx-4 my-4">
                    <h3 className="text-xl text-teal-400 font-bold">
                        Pilih Anggota
                    </h3>
                    <TextInput
                        className={"blcok w-full"}
                        placeholder={"Search Anggota"}
                    />
                    <div className="mt-2">
                        {anggota.length > 0
                            ? anggota.map((item, key) => (
                                  <div
                                      className="relative py-8 px-2.5 rounded-md shadow-md shadow-gray-400/50"
                                      key={key + 1}
                                  >
                                      <div className="flex gap-3">
                                          <img
                                              className="w-24 h-24 content-center"
                                              src={
                                                  "../storage/" +
                                                  item.foto_anggota
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
                                          <Buttons
                                              onClick={() => pilihAnggota(item)}
                                              className={
                                                  " bg-gradient-to-br from-teal-700 to-teal-500 text-white"
                                              }
                                          >
                                              Pilih Anggota
                                          </Buttons>
                                      </div>
                                  </div>
                              ))
                            : "Tidak ada Anggota, Silahkan tambahkan anggota terlebih dahulu"}
                    </div>
                </div>
            </Modal>
            <Authenticated>
                <Header
                    size="h-40"
                    header={"Data Mutasi"}
                    message={
                        "Menu ini di gunakan admin untuk melakukan penarikan saldo anggota, serta digunakan untuk melihat seluruh history mutasi yang telah berhasil dilakukan"
                    }
                />
                <div className="mx-4 my-2.5 flex justify-between items-center gap-3">
                    <Buttons
                        onClick={() => setModalSelectAnggota(true)}
                        className={
                            "py-2 px-2 rounded-md bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                        }
                    >
                        Tambah Transaksi Mutasi
                    </Buttons>
                    <FilterSearch link={"admin.data-mutasi"} />
                </div>
                <div className="mx-4 max-h-[90vh] overflow-y-auto touch-pan-y shadow-gray-400 border border-gray-400/50 py-1 px-2 rounded-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    {mutasi.map((item, key) => (
                        <div key={key + 1} className=" shadow-md ">
                            <div className=" hover:cursor-pointer hover:bg-teal-200  shadow-md shadow-gray-400 border border-gray-400/50 py-1 px-2 rounded-md flex gap-2 items-center">
                                <img
                                    className="w-16 h-16 content-center"
                                    src={
                                        "../storage/" +
                                        item.profile_anggota.foto_anggota
                                    }
                                    alt=""
                                />
                                <div className="py-2">
                                    <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                        {item.profile_anggota.nama_anggota}
                                    </h3>
                                    <p className="text-[8pt]">
                                        Tanggal transaksi mutasi :
                                        {item.tanggal_mutasi}
                                    </p>
                                    <p className="text-[8pt]">
                                        Di Proses Oleh :{" "}
                                        <strong>
                                            {item.profile_petugas.nama_petugas}
                                        </strong>
                                    </p>
                                    <p className="text-[8pt]">
                                        Jenis Transaksi Mutasi :
                                        {item.jenis_mutasi}{" "}
                                    </p>
                                    <p className="text-[8pt]">
                                        Besar Mutasi : Rp.{" "}
                                        {FormatUang(item.jumlah_mutasi)}
                                    </p>
                                    <p className="text-[8pt]">
                                        Sisa Saldo : Rp.{" "}
                                        {FormatUang(item.saldo)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pb-2 px-4">
                    <Pagination size="mt-3" {...{ meta, links }} />
                </div>
            </Authenticated>
        </div>
    );
}
