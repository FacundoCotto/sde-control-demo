'use client';
import { createUser } from '@/firebase/lib/realtimeDb';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';

interface InputValue {
    name: string;
    code: string;
}

interface FormValues {
    nombre: string;
    user: string;
    email: string;
    clave: string;
    tipoUsuario: string;
    usuarioDePanel: boolean;
    paginaDeInicio: string;
}

function ProfileCreate({ OnClose }: { OnClose: () => void }) {
    const toast = useRef<Toast>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        nombre: '',
        user: '',
        email: '',
        clave: '',
        tipoUsuario: '',
        usuarioDePanel: false,
        paginaDeInicio: ''
    });

    const tipoUsuario = [
        { name: 'Administrador', code: 'ADMIN' },
        { name: 'Usuario', code: 'USER' }
    ];

    const itemTemplate = (option: InputValue) => {
        return (
            <div className="flex align-items-center">
                <span className="ml-2">{option.name}</span>
            </div>
        );
    };

    const handleCreateUser = async () => {
        try {
            const dataToSend = {
                ...formValues,
                creadoEn: new Date().toISOString(),
                actualizadoEn: new Date().toISOString()
            };
            const newId = await createUser(dataToSend);
            console.log('Usuario creado con ID:', newId);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Usuario creado exitosamente', life: 1000 });
            OnClose();
        } catch (err: any) {
            if (err.message) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message, life: 1000 });
            }
        }
    };

    return (
        <div className="">
            <div className="grid">
                <div className="col-12">
                    <div className="grid formgrid p-fluid">
                        <div className="field mb-4 col-12 md:col-6">
                            <Toast ref={toast} />

                            <label htmlFor="nombre" className="font-medium text-900">
                                Nombre
                            </label>
                            <InputText id="nombre" type="text" value={formValues?.nombre} onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="user" className="font-medium text-900">
                                User
                            </label>
                            <InputText id="user" type="text" value={formValues?.user} onChange={(e) => setFormValues({ ...formValues, user: e.target.value })} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                                Email
                            </label>
                            <InputText id="email" type="text" value={formValues?.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="clave" className="font-medium text-900">
                                Clave
                            </label>
                            <InputText id="clave" type="text" value={formValues?.clave} onChange={(e) => setFormValues({ ...formValues, clave: e.target.value })} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="tipo-usuario" className="font-medium text-900">
                                Tipo Usuario
                            </label>
                            <Dropdown
                                value={formValues.tipoUsuario}
                                onChange={(e) => setFormValues({ ...formValues, tipoUsuario: e.value })}
                                options={tipoUsuario}
                                itemTemplate={itemTemplate}
                                optionLabel="name"
                                placeholder="Seleccione un tipo de usuario"
                            />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="usuario-de-panel" className="font-medium text-900">
                                Usuario de Panel
                            </label>
                            <div>
                                <InputSwitch checked={formValues?.usuarioDePanel} onChange={(e) => setFormValues({ ...formValues, usuarioDePanel: e.value ?? false })} />
                            </div>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="pagina-de-inicio" className="font-medium text-900">
                                Pagina de Inicio
                            </label>
                            <InputText id="pagina-de-inicio" type="text" value={formValues?.paginaDeInicio} onChange={(e) => setFormValues({ ...formValues, paginaDeInicio: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-content-between col-12 mt-6">
                        <Button label="Salir" icon="pi pi-times" outlined severity="secondary" onClick={OnClose} />
                        <Button label="Create User" icon="pi pi-check" onClick={handleCreateUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
