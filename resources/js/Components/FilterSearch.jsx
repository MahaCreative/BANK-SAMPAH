import { router } from "@inertiajs/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Buttons from "./Buttons/Buttons";
import TextInput from "./TextInput";
import { debounce } from "@mui/material";

export default function FilterSearch({ link }) {
    const [params, setParams] = useState({ search: "", paginate: "10" });

    const changeHandler = debounce((value) => {
        router.get(route(link), value, {
            preserveState: true,
            preserveScroll: true,
            replace: false,
        });
    }, 500);
    useEffect(() => {}, [params, changeHandler]);
    return (
        <div className="flex justify-between">
            <div className="flex gap-1 justify-between items-center">
                <select
                    onChange={(e) => {
                        setParams({
                            ...params,
                            [e.target.name]: e.target.value,
                        });
                        changeHandler(params);
                    }}
                    name="paginate"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-[8pt]"
                >
                    <option value="all">All</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <TextInput
                    name={"search"}
                    handleChange={(e) => {
                        setParams({
                            ...params,
                            [e.target.name]: e.target.value,
                        });
                        changeHandler(params);
                    }}
                ></TextInput>
            </div>
        </div>
    );
}
