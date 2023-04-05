import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import Profile from "./Profile";
import User from "./User";

export default function SettingProfile() {
    return (
        <div>
            <Authenticated>
                <div className="shadow-md shadow-gray-400/50 py-2.5 px-4 rounded-md mx-4">
                    <h3 className="text-teal-400 font-bold">Data User Login</h3>
                    <User />
                </div>
                <div className="shadow-md shadow-gray-400/50 py-2.5 px-4 rounded-md mx-4">
                    <h3 className="text-teal-400 font-bold">Profile Anggota</h3>
                    <Profile />
                </div>
            </Authenticated>
        </div>
    );
}
