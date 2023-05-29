import { Link, Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative -center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
                <div className="bg-emerald-500 w-full h-screen items-center justify-center flex">
                    <p className="text-white font-bold text-3xl">
                        BANK SAMPAH MAMUJU KEREN
                    </p>
                </div>
            </div>
        </>
    );
}
