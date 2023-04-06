import { FormatUang } from "@/FormatUang";
import Report from "@/Layouts/Report";
import moment from "moment";
import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
export default function Penjualan({ penjualan, total }) {
    return (
        <div>
            <Report title={"Laporan Penjualan Sampah"}></Report>
            <div className="px-4">
                <table className=" w-full text-[8pt] py-2 px-2 capitalize">
                    <thead className="font-bold">
                        <td>No</td>
                        <td className="text-center">Kode Penjualan</td>
                        <td className="text-center">Tanggal Penjualan</td>
                        <td className="text-center">Petugas Menangani</td>
                        <td className="text-center">Total Penjualan</td>
                    </thead>
                    <tbody>
                        {penjualan.map((item, key) => (
                            <tr
                                key={key + 1}
                                className="border-b border-gray-400/50"
                            >
                                <td>{key + 1}</td>
                                <td>{item.no_penjualan}</td>
                                <td>
                                    {moment(item.created_at).format(
                                        "DD-MMMM-Y"
                                    )}
                                </td>
                                <td>{item.profile_petugas.nama_petugas}</td>
                                <td>Rp. {FormatUang(item.total_penjualan)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full flex justify-end my-2 px-2">
                    <p className="text-[8pt] font-bold bg-gray-300">
                        Total Pembelian : Rp. {FormatUang(total)}
                    </p>
                </div>
            </div>
            <div>
                <a
                    href={route("ketua.pdf-laporan-penjualan")}
                    className="hover:cursor-pointer h-10 w-10 bg-emerald-400 absolute bottom-5 right-5 rounded-full text-center flex justify-center items-center"
                >
                    <PictureAsPdfIcon color="inherit" className="text-white" />
                </a>
            </div>
        </div>
    );
}
