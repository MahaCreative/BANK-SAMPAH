import Buttons from '@/Components/Buttons/Buttons'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function Form({model, setModel, open, close}) {
    
    const {data, setData, post, reset, errors} = useForm({
        nama_petugas:'',
        alamat:'',
        no_telp:'',
        foto_petugas:''
    })
    
    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('admin.petugas'), {
            onSuccess: () => {reset(); close(false)}
        })
    }

    const updateHandler = (e) => {
        e.preventDefault()
        router.post(route('admin.petugas'),{
            _method: 'patch',
            data,
            foto_petugas:data.foto_petugas,
            onSuccess:() => {
                reset();
                setModel([null]);
                close(false)
            }
        })
    }

    useEffect(() => setData({...data,
        id: model ? model.id : '',
        nama_petugas: model ? model.nama_petugas :'',
        alamat: model ? model.alamat :'',
        no_telp: model ? model.no_telp :'',
        foto_petugas: model ? model.foto_petugas :''
    }), [model])

    return (
    <div>
        <Modal height='min-h-[55%]' show={open} onClose={close}>
            <div className="py-2.5 px-4">
                <h3 className='uppercase text-teal text-md font-semibold text-teal-400'>{model ? 'Edit Data Petugas' : 'Tambah Petugas Baru'}</h3>
                <form action="" encType='multipart/form-data' onSubmit={model ? updateHandler : submitHandler}>
                    <InputLabel forInput={'nama_petugas'} value={'Nama Petugas'}/>
                    <TextInput handleChange={changeHandler} value={data.nama_petugas} name={'nama_petugas'} placeholder={"Nama Petugas"} className={'block mt-1 w-full'}/>
                    {errors.nama_petugas && <InputError message={errors.nama_petugas}/>}

                    <InputLabel forInput={'no_telp'} value={'No Telp'}/>
                    <TextInput handleChange={changeHandler} value={data.no_telp} name={'no_telp'} placeholder={"No Telp"} className={'block mt-1 w-full'}/>
                    {errors.no_telp && <InputError message={errors.no_telp}/>}

                    <InputLabel forInput={'alamat'} value={'alamat'}/>
                    <TextInput handleChange={changeHandler} value={data.alamat} name={'alamat'} placeholder={"alamat"} className={'block mt-1 w-full'}/>
                    {errors.alamat && <InputError message={errors.alamat}/>}

                    <InputLabel forInput={'foto_petugas'} value={'Foto Petugas'}/>
                    <TextInput handleChange={(e) => setData('foto_petugas', e.target.files[0])} type={'file'} name={'foto_petugas'} placeholder={"Foto Petugas"} className={'block mt-1 w-full'}/>
                    {errors.foto_petugas && <InputError message={errors.foto_petugas}/>}

                    <Buttons className='my-2.5 bg-gradient-to-br from-teal-400 to-cyan-400 text-white'>{model ? 'Update' : 'Submit'}</Buttons>
                </form>
            </div>
        </Modal>
    </div>
  )
}
