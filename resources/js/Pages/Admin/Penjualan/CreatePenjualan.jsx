import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useCallback, useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { debounce } from "@mui/material";
import CurrencyFormat from "react-currency-format";
import Buttons from "@/Components/Buttons/Buttons";
export default function CreatePenjualan({ penjualan, sampah }) {
    const [addProduct, setAddProduct] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [search, setSearch] = useState({ search: "" });
    const [data, setData] = useState({ jumlah: "", id_sampah: "" });
    const changeHandler = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
        router.get(route("admin.search-produk"), search, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const addProductHandler = (data) => {
        router.post(route("admin.add-produk", data));
    };
    const change = (e, item) => {
        // const {name, value} = e.target;
        setData({
            ...data,
            [e.target.name]: e.target.value,
            id_sampah: item.kategori_sampah_id,
        });
    };

    const reload = useCallback(
        debounce((query) => {
            router.post(
                route("admin.insert_sampah"),
                query,
                {
                    preserveState: true,
                    preserveScroll: true,
                },
                150
            );
        }),
        []
    );
    useEffect(() => reload(data), [data]);

    const [dataBayar, setDataBayar] = useState({
        total: penjualan.total_penjualan,
        bayar: 0,
        kembalian: 0,
    });

    const bayarHandler = (e) => {
        let bayar = e.target.value;
        bayar = bayar.replace("Rp. ", "");
        bayar = bayar.replace(",", "").replace(".", "");
        let kembalian = bayar - penjualan.total_penjualan;
        setDataBayar({ ...dataBayar, bayar: bayar, kembalian: kembalian });
    };

    const checkOut = () => {
        if (
            dataBayar.kembalian < 0 ||
            dataBayar.bayar === null ||
            dataBayar.bayar == 0
        ) {
            setModalError(true);
        } else {
            router.post(route("admin.check_out_penjualan"), {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const deleteItemHandler = (item) => {
        router.delete(route("admin.delete_item", item), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div>
            <Authenticated>
                <Modal
                    height="min-h-[22%]"
                    show={modalError}
                    onClose={setModalError}
                >
                    <div className="my-2 mx-4">
                        <h3 className="font-bold text-red-500 text-2xl">
                            Error
                        </h3>
                        <p>
                            Gagal melakukan pembayaran, mungkin terdapat
                            kesalahan pada data pembayaran anda
                        </p>
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
                <Modal show={addProduct} onClose={setAddProduct}>
                    <div className="my-4 mx-4">
                        <div className="flex justify-between mx-2 items-center">
                            <h3 className="text-teal-400 font-semibold text-xl">
                                Add Item
                            </h3>
                            <Buttons
                                onClick={() => setAddProduct(false)}
                                className={
                                    "w-8 h-8 bg-gradient-to-tr from-red-400 to-orange-400 text-white"
                                }
                            >
                                Close
                            </Buttons>
                        </div>
                        <TextInput
                            handleChange={changeHandler}
                            name={"search"}
                            className={"block w-full"}
                            placeholder="Cari Produk"
                        />
                    </div>
                    {sampah.map((item, key) => (
                        <div
                            key={key + 1}
                            onClick={() => addProductHandler(item)}
                            className="hover:cursor-pointer hover:bg-teal-200 my-2.5 mx-4 flex gap-3 shadow-md shadow-gray-400 border border-gray-400/50 py-2.5 px-2 rounded-md "
                        >
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
                                    Harga Jual :{" "}
                                    <CurrencyFormat
                                        disabled={true}
                                        type="text"
                                        value={item.harga_jual}
                                    />
                                </p>
                                <p className="text-[8pt] my-2">
                                    Harga Beli :{" "}
                                    <CurrencyFormat
                                        disabled={true}
                                        type="text"
                                        value={item.harga_beli}
                                    />
                                </p>
                                <p className="text-[8pt]">
                                    Stok : {item.stok} {item.satuan}
                                </p>
                            </div>
                        </div>
                    ))}
                </Modal>
                <div className="my-2 mx-4">
                    <h3 className="text-sm font-semibold text-teal-400">
                        Transaksi Penjualan Sampah
                    </h3>
                    <div className="my-2 5">
                        <div className="flex gap-1">
                            <p className="text-[8pt] text-gray-600 font-semibold">
                                Kode Penjualan
                            </p>
                            <p className="text-[8pt] text-gray-600 font-semibold">
                                : {penjualan.no_penjualan}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-[8pt] text-gray-600 font-semibold">
                                Tanggal Penjualan
                            </p>
                            <p className="text-[8pt] text-gray-600 font-semibold">
                                : {penjualan.tanggal_penjualan}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-4 max-h-[270px] scroll-smooth overflow-y-auto px-2 my-2 grid grid-cols-2 gap-2 rounded-md shadow-md shadow-gray-400/50 border border-gray-400/50 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-emerald-400 scrollbar-track-emerald-200">
                    {penjualan.detail_penjualan.map((item, key) => (
                        <div key={key + 1}>
                            <div className="hover:cursor-pointer hover:bg-teal-200 my-2.5 shadow-md shadow-gray-400 border border-gray-400/50 py-2.5 px-2 rounded-md">
                                <div className="flex justify-between">
                                    <img
                                        className="w-16 h-16 content-center"
                                        src={
                                            "/storage/" +
                                            item.kategori_sampah.image
                                        }
                                        alt=""
                                    />
                                    <div className="">
                                        <Buttons
                                            onClick={() =>
                                                deleteItemHandler(item)
                                            }
                                            className={
                                                "bg-gradient-to-br from-red-500 to-orange-400 text-white"
                                            }
                                        >
                                            delete
                                        </Buttons>
                                    </div>
                                </div>
                                <div className="py-2.5 w-full">
                                    <h3 className="uppercase text-teal text-md font-semibold text-teal-400">
                                        {item.kategori_sampah.nama_kategori}
                                    </h3>
                                    <p name={"jumlah"} className="text-[8pt]">
                                        Harga Jual :{" "}
                                        {item.kategori_sampah.harga_jual} /{" "}
                                        {item.kategori_sampah.satuan}
                                    </p>
                                    <TextInput
                                        value={item.jumlah}
                                        name={"jumlah"}
                                        handleChange={(e) => change(e, item)}
                                        min={1}
                                        max={99}
                                        type={"number"}
                                        className={"block w-full my-1.5"}
                                        placeholder={item.jumlah}
                                    />
                                    <p className="text-[8pt]">
                                        Sub Total :{" "}
                                        {item.jumlah *
                                            item.kategori_sampah.harga_jual}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {penjualan.status_penjualan === "belum selesai" && (
                    <div
                        onClick={() => setAddProduct(true)}
                        className="fixed bottom-[26%] right-5 hover:cursor-pointer bg-teal-400 rounded-full text-white hover:scale-105"
                    >
                        <AddCircleIcon color="inherit" sx={{ fontSize: 40 }} />
                    </div>
                )}
                {penjualan.status_penjualan === "belum selesai" ? (
                    <div className="fixed  left-0 bottom-0 bg-teal-300 py-2.5 px-4 w-full">
                        <div className="flex gap-1 items-center w-full">
                            <div className="w-full ">
                                <h3 className="font-bold w-[100px]">TOTAL :</h3>
                                <CurrencyFormat
                                    className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                    disabled={true}
                                    prefix="Rp. "
                                    thousandSeparator={true}
                                    value={penjualan.total_penjualan}
                                />
                            </div>
                            <div className="w-full ">
                                <h3 className="font-bold w-[100px]">Bayar :</h3>
                                <CurrencyFormat
                                    name={"bayar"}
                                    onChange={bayarHandler}
                                    className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                    prefix="Rp. "
                                    thousandSeparator={true}
                                    placeholder={dataBayar.bayar}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <h3 className="font-bold w-[100px]">Kembalian :</h3>
                            <CurrencyFormat
                                className="font-digital w-full rounded-md shadow-md shadow-gray-400 bg-black text-green-400"
                                disabled={true}
                                prefix="Rp. "
                                thousandSeparator={true}
                                value={dataBayar.kembalian}
                            />
                        </div>
                        <Buttons
                            onClick={checkOut}
                            as="button"
                            className={
                                "block  px-2 py-2.5  rounded-md  items-center  text-center mt-2.5 bg-black font-bold text-white"
                            }
                        >
                            Bayar
                        </Buttons>
                    </div>
                ) : (
                    <div className="fixed  left-0 bottom-0 bg-teal-300 py-2.5 px-4 w-full flex justify-between">
                        <h3 className="text-white my-2 font-bold">
                            Penjualan Ini Telah Selesai Di Lakukan
                        </h3>
                        <Link
                            className="bg-black py-2 px-4 rounded-md text-green-400 font-digital transition duration-200 ease-linear hover:bg-gray-900 hover:text-green-200"
                            href={route("admin.create-penjualan")}
                        >
                            Penjualan Baru
                        </Link>
                    </div>
                )}
            </Authenticated>
        </div>
    );
}
