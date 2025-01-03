'use client';
//librerias externas
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { useForm, Controller } from 'react-hook-form';
//componentes o hooks o servicios propios
import InputTextController from '../../../common/component/input-text-controller';
import { Button } from 'primereact/button';

export const UsuarioForm = () => {
    const [password, setPassword] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        watch,
        isValid,
        formState: { errors }
    } = useForm({
        defaultValues: {
            nombres: '',
            apellidos: '',
            email: '',
            avatar: null,
            username: '',
            password: ''
        }
    });

    const onSubmit = async () => {
        console.log(getValues());
        const formData = new FormData();

        if(isValid){
            await createUser(data);
        }else {
            //TODO add toast
        }
    }

    const onUpload = (event) => {
        setValue('avatar', event.files[0]);
    }

    useEffect(() => {
        console.log('changes on nombre field');
    }, []);

    return (
        <>
            <h1>Registro de Usuario</h1>
            <form className="w-full flex justify-content-center align-items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-column gap-2">
                    <InputTextController control={control} name="nombres" placeholder="Ingrese los nombres" rules={{ required: true }} label='Nombres'/>
                    <InputTextController control={control} name="apellidos" placeholder="Ingrese los apellidos" rules={{ required: true }} />
                    <InputTextController control={control} name="email" placeholder="Ingrese un email" rules={{ required: true }} />
                    <InputTextController control={control} name="username" placeholder="Ingrese un username" rules={{ required: true }} />
                    <div>
                        <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>
                    </div>
                </div>
                <FileUpload name="Avatar" multiple={false} accept="image/*" maxFileSize={1000000} customUpload={true} uploadHandler={(e) => onUpload(e)} emptyTemplate={<p>Seleccione una imagen</p>} />
                <Button label="REGISTRAR" className="w-full p-3" size='small' onClick={() => onSubmit()}></Button>
            </form>
        </>
    );
};
