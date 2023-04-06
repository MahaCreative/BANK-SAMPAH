import Buttons from "@/Components/Buttons/Buttons";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";

export default function User() {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(
        () =>
            setData({
                ...data,
                name: auth.user ? auth.user.name : "",
                email: auth.user ? auth.user.email : "",
            }),
        [auth]
    );

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        patch(route("admin.setting-profile"), {
            onSuccess: () => {
                reset("password", "password");
            },
        });
    };
    return (
        <div className="w-full">
            <form action="" className="w-full" onSubmit={submitHandler}>
                <InputLabel forInput={"name"} value={"User Name"} />
                <TextInput
                    handleChange={changeHandler}
                    value={data.name}
                    name="name"
                    className={"block w-full mt-1.5"}
                />
                {errors.name && <InputError message={errors.name} />}

                <InputLabel forInput={"email"} value={"Email"} />
                <TextInput
                    handleChange={changeHandler}
                    value={data.email}
                    name="email"
                    className={"block w-full mt-1.5"}
                />
                {errors.email && <InputError message={errors.email} />}

                <InputLabel forInput={"password"} value={"Password"} />
                <TextInput
                    type={"password"}
                    handleChange={changeHandler}
                    name="password"
                    className={"block w-full mt-1.5"}
                />
                {errors.password && <InputError message={errors.password} />}

                <InputLabel
                    forInput={"password_confirmation"}
                    value={"Password confirmation"}
                />
                <TextInput
                    type={"password"}
                    handleChange={changeHandler}
                    name="password_confirmation"
                    className={"block w-full mt-1.5"}
                />
                {errors.password_confirmation && (
                    <InputError message={errors.password_confirmation} />
                )}

                <Buttons
                    className={
                        "bg-teal-400 text-white mt-2.5 hover:bg-teal-500"
                    }
                >
                    Submit
                </Buttons>
            </form>
        </div>
    );
}
