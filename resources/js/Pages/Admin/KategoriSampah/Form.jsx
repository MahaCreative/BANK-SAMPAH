import Buttons from "@/Components/Buttons/Buttons";
import InputCurency from "@/Components/InputCurency";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";

export default function Form({ model, setModel, open, close }) {
    const { data, setData, post, errors, reset } = useForm({
        nama_kategori: "",
        harga_beli: "",
        harga_jual: "",
        satuan: "",
        stok: "",
        image: "",
    });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.kategori-sampah"), {
            onSuccess: () => {
                reset();
                close(false);
            },
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();
        router.post(route("admin.kategori-sampah"), {
            _method: "patch",
            data,
            image: data.image,
        });
    };

    useEffect(
        () =>
            setData({
                ...data,
                id: model ? model.id : "",
                nama_kategori: model ? model.nama_kategori : "",
                harga_beli: model ? model.harga_beli : "",
                harga_jual: model ? model.harga_jual : "",
                satuan: model ? model.satuan : "",
                stok: model ? model.stok : "",
                image: model ? model.image : "",
            }),
        [model]
    );

    return (
        <div>
            <Modal height="h-[65%]" show={open} onClose={close}>
                <div className="px-4 py-2.5 w-full">
                    <form
                        encType="multipart/form-data"
                        onSubmit={model ? updateHandler : submitHandler}
                    >
                        <InputLabel
                            value={"Nama Sampah"}
                            forInput={"nama_kategori"}
                        />
                        <TextInput
                            value={data.nama_kategori}
                            handleChange={changeHandler}
                            name={"nama_kategori"}
                            className={"block w-full mt-1"}
                            placeholder={"Nama Sampah"}
                        />

                        <InputLabel
                            value={"Harga Beli"}
                            forInput={"harga_beli"}
                        />
                        <InputCurency
                            value={data.harga_beli}
                            onChange={changeHandler}
                            name={"harga_beli"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            renderText={(value) => <div>{value}</div>}
                        />

                        <InputLabel
                            value={"Harga Jual"}
                            forInput={"harga_jual"}
                        />
                        <InputCurency
                            value={data.harga_jual}
                            onChange={changeHandler}
                            name={"harga_jual"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            renderText={(value) => <div>{value}</div>}
                        />

                        <InputLabel value={"Satuan"} forInput={"satuan"} />
                        <select
                            name={"satuan"}
                            onChange={changeHandler}
                            id=""
                            className="text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full mt-1"
                        >
                            <option
                                value=""
                                disabled
                                defaultValue={data.satuan ? data.satuan : ""}
                            >
                                {data.satuan ? data.satuan : "Pilih Satuan"}
                            </option>
                            <option value="PCS">PCS</option>
                            <option value="KG">KG</option>
                            <option value="DOS">DOS</option>
                        </select>

                        <InputLabel
                            name={"stok"}
                            value={"Stok"}
                            forInput={"stok"}
                        />
                        <TextInput
                            value={data.stok}
                            handleChange={changeHandler}
                            name={"stok"}
                            className={"block w-full mt-1"}
                            placeholder={"Stok"}
                        />

                        <InputLabel
                            name={"image"}
                            value={"Image"}
                            forInput={"image"}
                        />
                        <TextInput
                            handleChange={(e) => {
                                setData("image", e.target.files[0]);
                            }}
                            type={"file"}
                            name={"image"}
                            className={"block w-full mt-1"}
                        />

                        <Buttons
                            className={
                                "bg-gradient-to-br from-teal-400 to-green-400 my-2.5 text-white"
                            }
                        >
                            {model ? "Update" : "Submit"}{" "}
                        </Buttons>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
