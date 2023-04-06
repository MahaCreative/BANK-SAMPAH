import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Report({ title, children, link }) {
    const { auth } = usePage().props;
    return (
        <div className="my-4 px-4">
            <div className="border-b-4 border-black">
                <h3 className="font-extrabold text-center uppercase">
                    Bank Sampah Mamuju Keren
                </h3>
                <h6 className="font-extrabold text-center uppercase text-sm">
                    {title}
                </h6>
                <div className="flex justify-between text-[10pt]">
                    <p>Tanggal Laporan : </p>
                    <p>Cetak By : {auth.profile_petugas}</p>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}
