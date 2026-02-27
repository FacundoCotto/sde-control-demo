'use client';
import { User } from '@/firebase/lib/realtimeDb';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import React from 'react';


function ReadUser({ OnClose, user }: { OnClose: () => void, user: User }) {

    return (
        <div className="">
            <div className="grid">
                <div className="col-12">
                    <div className="grid formgrid p-fluid">
                        <div className="field mb-4 col-12 md:col-6">

                            <label htmlFor="nombre" className="font-medium text-900">
                                Nombre
                            </label>
                            <InputText id="nombre" type="text" value={user?.name} readOnly />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="user" className="font-medium text-900">
                                User
                            </label>
                            <InputText id="user" type="text" value={user?.user} readOnly />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">
                                Email
                            </label>
                            <InputText id="email" type="text" value={user?.email} readOnly />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="clave" className="font-medium text-900">
                                Clave
                            </label>
                            <InputText id="clave" type="text" value={user?.password} readOnly />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="tipo-usuario" className="font-medium text-900">
                                Tipo Usuario
                            </label>
                            <InputText id="tipo-usuario" type="text" value={user?.userType} readOnly />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="usuario-de-panel" className="font-medium text-900">
                                Usuario de Panel
                            </label>
                            <div>
                                <InputSwitch checked={user!.panelUser} readOnly />
                            </div>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="pagina-de-inicio" className="font-medium text-900">
                                Pagina de Inicio
                            </label>
                            <InputText id="pagina-de-inicio" type="text" value={user?.homePage} readOnly />
                        </div>
                    </div>
                    <div className="flex justify-content-between col-12 mt-6">
                        <Button label="Salir" icon="pi pi-times" outlined severity="secondary" onClick={OnClose} />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadUser;
