import Buttons from '@/Components/Buttons/Buttons'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function Form({model, setModel, open, close}) {
    const {data,setData, post, reset, errors} = useForm({
        id: '', nama_anggota:'', nik:'', kk:'', tempat_lahir:'', tanggal_lahir:'', nama_rekening:'', no_rekening:'', telp:'', jenis_kelamin:'', alamat:'', foto_anggota:''
    })

    const changeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        post(route('admin.anggota'), {
            onSuccess: () => {reset(), close(false)}
        })
    }

    const updateHandler = (e) => {
        e.preventDefault()
        router.post(route('admin.anggota'), {
            _method: 'patch',
            data,
            foto_anggota : data.foto_anggota,
            onSuccess: () => {reset(), setModel([null])}
        })
    }

    useEffect(() => setData({...data,
    id: model ? model.id : '',
    nama_anggota: model ? model.nama_anggota : '',
    nik: model ? model.nik : '',
    kk: model ? model.kk : '',
    tempat_lahir: model ? model.tempat_lahir : '',
    tanggal_lahir: model ? model.tanggal_lahir : '',
    nama_rekening: model ? model.nama_rekening : '',
    no_rekening: model ? model.no_rekening : '',
    telp: model ? model.telp : '',
    jenis_kelamin: model ? model.jenis_kelamin : '',
    alamat: model ? model.alamat : '',
    foto_anggota: model ? model.foto_anggota :  ''
    }), [model])
  return (
    <>
        <Modal show={open} onClose={close}>
            <div className='px-4 py-2.5 w-full'>
                <form className='w-full' encType='multipart/form-data' onSubmit={model ? updateHandler : submitHandler}>
                    <div className="w-full">
                        <InputLabel forInput={'nama_anggota'} value={'Nama Anggota'}/>
                        <TextInput value={data.nama_anggota} handleChange={changeHandler} name={'nama_anggota'}  className={'block w-full mt-1.5'} placeholder="Nama Anggota"/>
                        {errors.nama_anggota && <InputError message={errors.nama_anggota}/>}
                    </div>
                    <div className="flex justify-between gap-1 mt-1">
                        <div className="w-full">
                            <InputLabel forInput={'nik'} value={'NIK'}/>
                            <TextInput value={data.nik} handleChange={changeHandler} name={'nik'}  className={'block w-full mt-1.5'} placeholder="NIK"/>
                            {errors.nik && <InputError message={errors.nik}/>}
                        </div>
                        <div className="w-full">
                            <InputLabel forInput={'kk'} value={'KK'}/>
                            <TextInput value={data.kk} handleChange={changeHandler} name={'kk'}  className={'block w-full mt-1.5'} placeholder="KK"/>
                            {errors.kk && <InputError message={errors.kk}/>}
                        </div>
                    </div>
                    <div className="flex justify-between gap-1 mt-1">
                         <div className="w-full">
                            <InputLabel forInput={'tempat_lahir'} value={'Tempat Lahir'}/>
                            <TextInput value={data.tempat_lahir} handleChange={changeHandler} name={'tempat_lahir'}  className={'block w-full mt-1.5'} placeholder="Tempat Lahir"/>
                            {errors.tempat_lahir && <InputError message={errors.tempat_lahir}/>}
                        </div>
                        <div className="w-full">
                            <InputLabel forInput={'tanggal_lahir'} value={'Tanggal Lahir'}/>
                            <TextInput value={data.tanggal_lahir} handleChange={changeHandler} type={'date'} name={'tanggal_lahir'}  className={'block w-full mt-1.5'} placeholder="Tanggal Lahir"/>
                            {errors.tanggal_lahir && <InputError message={errors.tanggal_lahir}/>}
                        </div>
                    </div>

                    <select   onChange={changeHandler} name="jenis_kelamin" id="" className='text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full'>
                        <option defaultValue={data.jenis_kelamin =='' ? 'Pilih Jenis Kelamin' : data.jenis_kelamin} disabled>{data.jenis_kelamin =='' ? 'Pilih Jenis Kelamin' : data.jenis_kelamin}</option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                    {errors.jenis_kelamin && <InputError message={errors.jenis_kelamin}/>}
                    <div  className="flex justify-between gap-1 mt-1">
                        <div className="w-full">
                            <InputLabel forInput={'nama_rekening'} value={'Nama Rekening'}/>
                            <TextInput value={data.nama_rekening} handleChange={changeHandler} name={'nama_rekening'}  className={'block w-full mt-1.5'} placeholder="Nama Rekening"/>
                            {errors.nama_rekening && <InputError message={errors.nama_rekening}/>}
                        </div>
                        <div className="w-full">
                            <InputLabel forInput={'no_rekening'} value={'No Rekening'}/>
                            <TextInput value={data.no_rekening} handleChange={changeHandler} name={'no_rekening'}  className={'block w-full mt-1.5'} placeholder="No Rekening"/>
                            {errors.no_rekening && <InputError message={errors.no_rekening}/>}
                        </div>
                    </div>
                    <div className="w-full">
                        <InputLabel forInput={'telp'} value={'Nomor Telephone'}/>
                        <TextInput value={data.telp} handleChange={changeHandler} name={'telp'}  className={'block w-full mt-1.5'} placeholder="Nomor Telephone"/>
                        {errors.telp && <InputError message={errors.telp}/>}
                    </div>
                    <div className="w-full">
                        <InputLabel forInput={'alamat'} value={'Alamat'}/>
                        <TextInput value={data.alamat} handleChange={changeHandler} name={'alamat'}  className={'block w-full mt-1.5'} placeholder="Alamat"/>
                        {errors.alamat && <InputError message={errors.alamat}/>}
                    </div>
                    <div className="w-full">
                        <InputLabel forInput={'foto_anggota'} value={'Foto Anggota'}/>
                        <TextInput handleChange={(e) => setData('foto_anggota', e.target.files[0])} type='file' name={'foto_anggota'}  className={'block w-full mt-1.5'} placeholder="Foto Anggota"/>
                        {errors.foto_anggota && <InputError message={errors.foto_anggota}/>}
                    </div>

                    <Buttons className='my-2.5 bg-gradient-to-br from-teal-400 to-cyan-400 text-white'>Submit</Buttons>
                </form>
            </div>
        </Modal>
    </>
  )
}
