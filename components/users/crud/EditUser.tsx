'use client';
import { updateUser, User } from '@/firebase/lib/realtimeDb';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { UserData } from '@/firebase/lib/realtimeDb';
import { showError, showSuccess } from '@/services/toastService';
import { FIREBASE_ERROR_MAP, FIREBASE_SUCCESS_MAP } from '@/constants/global.constants';


function CreateUser({ OnClose, user }: { OnClose: () => void, user: User }) {
    const toast = useRef<Toast>(null);
    const [formValues, setFormValues] = useState<UserData>({
        name: user.name,
        user: user.user,
        email: user.email,
        password: user.password,
        userType: user.userType,
        panelUser: user.panelUser,
        homePage: user.homePage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    });

    const userType = [{ type: 'Administrador' }, { type: 'Usuario' }];

    const itemTemplate = (option: { type: string }) => {
        return (
            <div className="flex align-items-center">
                <span className="ml-2">{option.type}</span>
            </div>
        );
    };

    const handleEditUser = async (user: User) => {
        try {
            const dataToSend = {
                ...formValues,
                updatedAt: new Date().toISOString()
            };
            await updateUser(user.id, dataToSend);
            showSuccess(toast, FIREBASE_SUCCESS_MAP['auth/user-updated']);
            OnClose();
        } catch (err: any) {
            const errorCode = err.code || err.message?.match(/\(([^)]+)\)/)?.[1] || '';
            const detail = FIREBASE_ERROR_MAP[errorCode];
            showError(toast, detail ?? 'Error al editar usuario');
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
                            <InputText id="nombre" type="text" value={formValues?.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
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
                            <InputText id="clave" type="text" value={formValues?.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="tipo-usuario" className="font-medium text-900">
                                Tipo Usuario
                            </label>
                            <Dropdown value={formValues.userType} onChange={(e) => setFormValues({ ...formValues, userType: e.value })} options={userType} itemTemplate={itemTemplate} optionLabel="type" optionValue="type" placeholder="Seleccione un tipo de usuario" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="usuario-de-panel" className="font-medium text-900">
                                Usuario de Panel
                            </label>
                            <div>
                                <InputSwitch checked={formValues?.panelUser} onChange={(e) => setFormValues({ ...formValues, panelUser: e.value ?? false })} />
                            </div>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="pagina-de-inicio" className="font-medium text-900">
                                Pagina de Inicio
                            </label>
                            <InputText id="pagina-de-inicio" type="text" value={formValues?.homePage} onChange={(e) => setFormValues({ ...formValues, homePage: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-content-between col-12 mt-6">
                        <Button label="Salir" icon="pi pi-times" outlined severity="secondary" onClick={OnClose} />
                        <Button label="Edit User" icon="pi pi-check" onClick={() => handleEditUser(user)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
