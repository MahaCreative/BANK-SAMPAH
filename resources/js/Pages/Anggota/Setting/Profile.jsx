import Buttons from "@/Components/Buttons/Buttons";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";

export default function Profile() {
    const { auth } = usePage().props;
    console.log(auth.profile.alamat);
    const { data, setData, post, errors, reset } = useForm({
        id: "",
        nik: "",
        kk: "",
        nama_anggota: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        foto_anggota: "",
        no_telp: "",
        no_rekening: "",
        nama_rekening: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("anggota.create-profile"));
    };

    const updateHandler = (e) => {
        e.preventDefault();
        router.post(route("anggota.update-profile"), {
            _method: "patch",
            data,
            foto_anggota: data.foto_anggota,
        });
    };

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    console.log(data);
    useEffect(
        () =>
            setData({
                ...data,
                nama_anggota: auth.profile ? auth.profile.nama_anggota : "",
                id: auth.profile ? auth.profile.id : "",
                nik: auth.profile ? auth.profile.nik : "",
                kk: auth.profile ? auth.profile.kk : "",
                nama_anggota: auth.profile ? auth.profile.nama_anggota : "",
                alamat: auth.profile ? auth.profile.alamat : "",
                tempat_lahir: auth.profile ? auth.profile.tempat_lahir : "",
                tanggal_lahir: auth.profile ? auth.profile.tanggal_lahir : "",
                jenis_kelamin: auth.profile ? auth.profile.jenis_kelamin : "",
                foto_anggota: auth.profile ? auth.profile.foto_anggota : "",
                no_telp: auth.profile ? auth.profile.no_telp : "",
                no_rekening: auth.profile ? auth.profile.no_rekening : "",
                nama_rekening: auth.profile ? auth.profile.nama_rekening : "",
            }),
        [auth]
    );

    return (
        <div>
            <img
                src={
                    data.foto_anggota
                        ? "/storage/" + data.foto_anggota
                        : "images/user.png"
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
                    value={data.nama_anggota}
                    handleChange={changeHandler}
                    name="nama_anggota"
                    placeholder="Nama Anggota"
                    className={"block w-full"}
                />
                {errors.nama_anggota && (
                    <InputError message={errors.nama_anggota} />
                )}

                <InputLabel value={"No Telp"} />
                <TextInput
                    value={data.nik}
                    handleChange={changeHandler}
                    name="telp"
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
                        setData("foto_anggota", e.target.files[0])
                    }
                    type={"file"}
                    name="foto_anggota"
                    className={"block w-full"}
                />
                {errors.foto_anggota && (
                    <InputError message={errors.foto_anggota} />
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
