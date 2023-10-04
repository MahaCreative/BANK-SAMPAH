import Buttons from "@/Components/Buttons/Buttons";
import FilterSearch from "@/Components/FilterSearch";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";

export default function Pembelian(props) {
    const anggota = props.anggota;
    const { data: pembelian, meta, links } = props.pembelian;
    const [modalSelectAnggota, setModalSelectAnggota] = useState(false);
    const [dataPembelian, setDataPembelian] = useState(null);
    const [lihatModal, setLihatModal] = useState(false);
    const pilihAnggota = (data) => {
        router.get(route("admin.create-pembelian"), data);
    };
    const lihatModalHandler = (item) => {
        setDataPembelian(item);
        setLihatModal(true);
    };
    console.log(dataPembelian);
    return (
        <div>
            <Modal show={lihatModal} onClose={setLihatModal}>
                <div className="my-16 mx-4">
                    <h3 className="text-xl text-teal-400 font-bold">
                        Data Pembelian
                    </h3>
                    {dataPembelian &&
                        dataPembelian.detail_pembelian.map((item, key) => (
                            <div
                                key={key + 1}
                                className="hover:cursor-pointer hover:bg-teal-200 my-2.5 mx-4 flex gap-3 shadow-md shadow-gray-400 border border-gray-400/50 py-2.5 px-2 rounded-md"
                            >
                                <img
                                    className="w-24 h-24 content-center"
                                    src={
                                        "./storage/" +
                                        item.kategori_sampah.image
                                    }
                                    alt=""
                                />
                                <div className="py-2.5 w-full">
                                    <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                        {item.kategori_sampah.nama_kategori}
                                    </h3>
                                    <p name={"jumlah"} className="text-[8pt]">
                                        Harga Jual :{" "}
                                        {item.kategori_sampah.harga_jual} /{" "}
                                        {item.kategori_sampah.satuan}
                                    </p>
                                    <p>
                                        Jumlah Pembelian : {item.jumlah}{" "}
                                        {item.kategori_sampah.satuan}
                                    </p>
                                    {/* <TextInput value={item.jumlah} name={'jumlah'} handleChange={(e) => change(e, item)} min={1} max={99} type={'number'} className={'block w-full my-1.5'} placeholder={item.jumlah}/> */}
                                    <p className="text-[8pt]">
                                        Sub Total :{" "}
                                        <CurrencyFormat
                                            type="text"
                                            prefix="Rp. "
                                            thousandSeparator={true}
                                            disabled={true}
                                            value={
                                                item.jumlah *
                                                item.kategori_sampah.harga_jual
                                            }
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}
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
                                                  "./storage/" +
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
                    header={"Data Pembelian"}
                    message={
                        "Data pembelian digunakan admin untuk menambakan pembelian sampah terhadap anggota baru. Menu ini menampilkan data pembelian yang telah dilakukan sebelumnya, untuk membuat pembelian baru silahkan menekan tombol tambah pembelian"
                    }
                />
                <div className="mx-4 my-2.5 flex justify-between items-center gap-3">
                    <Buttons
                        onClick={() => setModalSelectAnggota(true)}
                        className={
                            "py-2 px-2 rounded-md bg-teal-400 text-white font-nunito font-semibold hover:bg-teal-500 text-[8pt]"
                        }
                    >
                        Tambah Pembelian
                    </Buttons>
                    <FilterSearch link={"admin.pembelian"} />
                </div>
                <div className="max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    {/* display data */}
                    <div className="mx-4 my-2.5">
                        {pembelian.length > 0 ? (
                            pembelian.map((item, key) => (
                                <div
                                    key={key + 1}
                                    className="relative h-40 py-2.5 px-4 rounded-md shadow-md shadow-gray-400/50"
                                >
                                    <h3 className="text-teal-400 font-bold text-sm">
                                        Kode pembelian : {item.no_pembelian}
                                    </h3>
                                    <p className="text-sm font-light">
                                        Tanggal pembelian :
                                        {item.tanggal_pembelian}{" "}
                                    </p>
                                    <p className="text-sm font-light">
                                        Pembelian Oleh :{" "}
                                        {item.profile_petugas.nama_petugas}
                                    </p>
                                    <p className="text-sm font-light">
                                        Penjualan Oleh Anggota :{" "}
                                        {item.profile_anggota.nama_anggota}
                                    </p>
                                    <p className="text-sm font-light">
                                        Total Pembelian :{" "}
                                        <CurrencyFormat
                                            type="text"
                                            prefix="Rp. "
                                            thousandSeparator={true}
                                            value={item.total_pembelian}
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
                                            Lihat Pembelian
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
