import Pagination from '@/Components/Pagination';
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function NewUpdate() {
    const {informasi_update} = usePage().props
    console.log(informasi_update.meta);
  return (
    <>
        <h3 className='my-4 font-semibold text-teal-400'>New Post</h3>
        {informasi_update.data.length > 0 ? informasi_update.data.map((item, key) => (
        <div className='my-2.5'>
            <div className='rounded-md shadow-md shadow-gray-400/50 py-2.5 px-4 my-1.5'>
                <div className='flex gap-3 w-full'>
                    <img src={'/storage/images/preview.png'} alt="" className='w-28 h-28 object-cover'/>
                    <div className='w-full'>
                        <Link href={route('show-informasi', item.slug)}  className='hover:text-teal-600 block font-bold text-teal-400 border-b-4 border-teal-400'>{item.judul}</Link>
                        <div className="flex justify-between w-full">
                            <p className='text-[8pt] text-gray-700'>Post By : {item.profile_petugas.nama_petugas}</p>
                    <p className='text-[8pt] text-gray-700'>Post at : {item.tanggal_release}</p>
                        </div>
                        <p className='text-[8pt] line-clamp-2'>{item.deskripsi_singkat}</p>
                        <Link href={route('show-informasi', item.slug)} className='text-gray-500 text-[8pt] hover:text-teal-400 font-light'>Selengkapnya...</Link>
                    </div>
                </div>
            </div>
        </div>
        )) : ''}
        
    </>
  )
}
