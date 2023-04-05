import Buttons from '@/Components/Buttons/Buttons'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import NewUpdate from './NewUpdate'

export default function Informasi({informasi}) {
    const [search, setSearch] = useState({search:''})
    const changeHandler = (e) => {
        setSearch({...search, [e.target.name]: e.target.value})
     
    }
    const searchHandler = () => {
        router.get(route('informasi'),search)
    }
  return (
    <div>
        <Authenticated>
            <div className="flex gap-1 items-center">
                <TextInput name='search' handleChange={changeHandler} className={'block my-2.5 mx-4 w-[93%]'} placeholder={'Search...'}/>
                <Buttons onClick={searchHandler} className={'w-[60px] text-[8pt] mx-4 border border-gray-500'}>Search</Buttons>
            </div>
            <div className='my-2.5 mx-4'>
                <img src={'/storage' + informasi.gambar_informasi} className='w-full h-32 object-contain object-center'/>
            </div>
            <div className='my-2.5 mx-4'>
                <h3 className='font-semibold text-teal-400 border-b-4 border-teal-400'>{informasi.judul}</h3>
                <div className="flex justify-between items-center">
                    <p className='text-[8pt] text-gray-700'>Post By : {informasi.profile_petugas.nama_petugas}</p>
                    <p className='text-[8pt] text-gray-700'>Post ay : {informasi.tanggal_release}</p>
                </div>
                <div>
                    <p>{informasi.isi_informasi}</p>
                </div>
                <NewUpdate/>
            </div>
        </Authenticated>
    </div>
  )
}
