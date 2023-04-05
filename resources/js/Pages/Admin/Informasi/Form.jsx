import Buttons from '@/Components/Buttons/Buttons'
import Header from '@/Components/Header'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function Form() {
    let {informasi} = usePage().props
    const {data,setData, post, errors, reset} = useForm({
        judul:'', deskripsi_singkat:'', isi_informasi:'', gambar_informasi:''
    })

    const chageHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('admin.informasi'), {
            onSuccess : () => reset()
        })
    }

    const updateHandler = (e) => {
        e.preventDefault();
        router.post(route('admin.informasi'),{
            _method : 'patch',
            data,
            gambar_informasi : data.gambar_informasi,
            onFinish: reset()
        },
        )
    }

    useEffect(() => setData({...data,
        id:informasi ? informasi.id : '', judul: informasi ? informasi.judul :'', deskripsi_singkat: informasi ? informasi.deskripsi_singkat :'', isi_informasi: informasi ? informasi.isi_informasi :'', gambar_informasi: informasi ? informasi.gambar_informasi :''
    }), [informasi])

  return (
    <>
        <Authenticated>
            <Header header={'Buat Informasi'} message={'Silahkan tambahkan informasi-informasi anda pada form yang terdapat dibawah ini.'}/>
            <div className="my-2 mx-4">
                <form onSubmit={informasi ? updateHandler : submitHandler}>
                    <InputLabel value={'Judul'} forInput={'judul'}/>
                    <TextInput value={data.judul} name={'judul'} handleChange={chageHandler} placeholder={'Judul'} className={'block w-full mt-1'}/>
                    {errors.judul && <InputError message={errors.judul}/>} 
                    
                    <InputLabel value={'Deskripsi Singkat'} forInput={'deskripsi_singkat'}/>
                    <textarea value={data.deskripsi_singkat} name={'deskripsi_singkat'} placeholder='Deskripsi Singkat' onChange={chageHandler} className='text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full'></textarea>
                    {errors.deskripsi_singkat && <InputError message={errors.deskripsi_singkat}/>} 

                    <InputLabel value={'Isi Informasi'} forInput={'isi_informasi'}/>
                    <textarea value={data.isi_informasi} name={'isi_informasi'} placeholder='Isi Informasi' onChange={chageHandler} className='text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full'></textarea>
                    {errors.isi_informasi && <InputError message={errors.isi_informasi}/>} 

                    <InputLabel value={'Gambar Informasi'} forInput={'gambar_informasi'}/>
                    <TextInput name={'gambar_informasi'} placeholder={'Gambar Informasi'} handleChange={(e) => setData('gambar_informasi', e.target.files[0])} type={'file'} className={'block w-full mt-1'}/>
                    {errors.gambar_informasi && <InputError message={errors.gambar_informasi}/>} 

                    <div className="flex gap-3">
                        <Buttons className={'my-2.5 bg-gradient-to-br from-teal-400 to-green-400 text-white'}>{informasi ? 'Update' : 'Submit'}</Buttons>
                        <Link href={route('admin.informasi')}  className={'my-2.5 py-2.5 px-2 text-sm rounded-md bg-gradient-to-br from-red-500 to-orange-400 text-white'}>Cancell</Link>
                    </div>

                </form>
            </div>
        </Authenticated>
    </>
  )
}
