import Buttons from '@/Components/Buttons/Buttons'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function Akun({open, close, model}) {
    const {data, setData, post, reset, errors} = useForm({id_user:'',username : '', email:'', password:'', password_confirmation:''})

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('admin.data-anggota-create-akun'), {
            onSuccess: () => {reset('password', 'password_confirmation'); close(false)}
        })
    }

    const changeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    useEffect(() => setData({...data, id_user:model}), [model])
  return (
    <div>
        <Modal height='min-[65%]' show={open} onClose={close}>
            <div className='py-2.5 px-4'>
                <h3 className='text-teal-500'>Create Akun</h3>
            </div>
            <div className='py-2.5 px-4'>
                <form action="" onSubmit={submitHandler}>
                    <InputLabel forInput={'username'} value={'Username'}/>
                    <TextInput name={'username'} handleChange={changeHandler} placeholder={'Username'} className={'block w-full mt-1.5'}/>
                    {errors.username && <InputError message={errors.username} />}

                    <InputLabel forInput={'email'} value={'Email'}/>
                    <TextInput name={'email'} handleChange={changeHandler} type={'email'} placeholder={'Email'} className={'block w-full mt-1.5'}/>
                    {errors.email && <InputError message={errors.email} />}

                    <InputLabel forInput={'password'} value={'Password'}/>
                    <TextInput name={'password'} handleChange={changeHandler} type={'password'} placeholder={'password'} className={'block w-full mt-1.5'}/>
                    {errors.password && <InputError message={errors.password} />}

                    <InputLabel forInput={'password_confirmation'} value={'Password_confirmation'}/>
                    <TextInput name={'password_confirmation'} handleChange={changeHandler} type={'password'} placeholder={'password_confirmation'} className={'block w-full mt-1.5'}/>
                    {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                    <div className='flex justify-between gap-2.5 my-2.5'>
                        <Buttons className={'bg-gradient-to-br from-teal-500 to-green-400 text-white'}>Submit</Buttons>
                        <Buttons type={'button'} onClick={() => close(false)} className={'bg-gradient-to-br from-red-500 to-orange-400 text-white'}>Cancell</Buttons>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
  )
}
