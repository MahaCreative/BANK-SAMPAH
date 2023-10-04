import Buttons from "@/Components/Buttons/Buttons";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";

export default function Profile() {
    const { auth } = usePage().props;

    const { data, setData, post, errors, reset } = useForm({
        nama_petugas: "",
        no_telp: "",
        alamat: "",
        foto_petugas: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.create-profile"));
    };

    const updateHandler = (e) => {
        e.preventDefault();
        router.post(route("admin.update-profile"), {
            _method: "patch",
            data,
            foto_petugas: data.foto_petugas,
        });
    };

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(
        () =>
            setData({
                ...data,
                nama_petugas: auth.profile ? auth.profile.nama_petugas : "",
                no_telp: auth.profile ? auth.profile.no_telp : "",
                alamat: auth.profile ? auth.profile.alamat : "",
                foto_petugas: auth.profile ? auth.profile.foto_petugas : "",
            }),
        [auth]
    );

    return (
        <div>
            <img
                src={
                    data.foto_petugas
                        ? "./storage/" + data.foto_petugas
                        : "./images/user.png"
                }
                className="w-full h-44 object-cover"
            />

            <form
                action=""
                encType="multipart/form-data"
                onSubmit={auth.profile ? updateHandler : submitHandler}
            >
                <InputLabel value={"Nama Lengkap"} />
                <TextInput
                    value={data.nama_petugas}
                    handleChange={changeHandler}
                    name="nama_petugas"
                    placeholder="Nama Petugas"
                    className={"block w-full"}
                />
                {errors.nama_petugas && (
                    <InputError message={errors.nama_petugas} />
                )}

                <InputLabel value={"No Telp"} />
                <TextInput
                    value={data.no_telp}
                    handleChange={changeHandler}
                    name="no_telp"
                    placeholder="Nomor Telephone"
                    className={"block w-full"}
                />
                {errors.no_telp && <InputError message={errors.no_telp} />}

                <InputLabel value={"Alamat"} />
                <TextInput
                    value={data.alamat}
                    handleChange={changeHandler}
                    name="alamat"
                    placeholder="Alamat"
                    className={"block w-full"}
                />
                {errors.alamat && <InputError message={errors.alamat} />}

                <InputLabel value={"Foto"} />
                <TextInput
                    handleChange={(e) =>
                        setData("foto_petugas", e.target.files[0])
                    }
                    type={"file"}
                    name="foto_petugas"
                    className={"block w-full"}
                />
                {errors.foto_petugas && (
                    <InputError message={errors.foto_petugas} />
                )}

                <Buttons
                    className={
                        "bg-teal-400 hover:bg-teal-500 mt-2.5 text-white"
                    }
                >
                    {auth.profile ? "Update" : "Submit"}
                </Buttons>
            </form>
        </div>
    );
}
