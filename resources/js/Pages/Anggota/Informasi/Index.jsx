import PostUpdate from '@/Components/Corousel/PostUpdate'
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react'

export default function Index(props) {
    const {data:informasi, meta, links} = props.informasi;
    const [search, setSearch] = useState({search:''})
    const changeHandler = (e) => {
        setSearch({...search, [e.target.name]: e.target.value})
        router.get(route('informasi'),search,{
           preserveState:true,
        })
    }
  return (
    <div>
        <Authenticated>
            <TextInput name='search' handleChange={changeHandler} className={'block my-2.5 mx-4 w-[93%]'} placeholder={'Search...'}/>
            <PostUpdate/>
            <div className="mx-4 my-2.5">
                <h3 className='font-bold text-teal-500 text-xl border-b-4 border-teal-400'>Informasi</h3>
                <div className="grid grid-cols-2 gap-1">
                    {informasi.length > 0 ? informasi.map((item,key) => (
                    <Link href={route('show-informasi', item.slug)} as='div' className="my-2.5 hover:cursor-pointer hover:bg-teal-300/50 py-2 px-2 rounded-md shadow-md shadow-gray-400/50">
                        <img src={'/storage/' + item.gambar_informasi} alt="" className='h-24 w-full object-contain object-center'/>
                        <h3 className='text-teal-400 my-2.5 font-bold border-b-2 border-teal-400'>{item.judul}</h3>
                        <div className="flex justify-between">
                            <p className='text-[8pt] text-gray-700'>Post By : {item.profile_petugas.nama_petugas}</p>
                    <p className='text-[8pt] text-gray-700'>Post ay : {item.tanggal_release}</p>
                        </div>
                    </Link>
                    )) : (
                    <div className="py-2 px-2 rounded-md shadow-md shadow-gray-400/50">
                        <p>Data Informasi Belum Ada</p>
                    </div>
                    )}
                </div>
            </div>
            <Pagination {...{meta, links}}/>
        </Authenticated>
    </div>
  )
}
