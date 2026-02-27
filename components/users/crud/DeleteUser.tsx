'use client';
import { deleteUser } from '@/firebase/lib/realtimeDb';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import { User } from '@/firebase/lib/realtimeDb';
import { showError, showSuccess } from '@/services/toastService';
import { FIREBASE_ERROR_MAP, FIREBASE_SUCCESS_MAP } from '@/constants/global.constants';

function DeleteUser({ OnClose, user }: { OnClose: () => void; user: User }) {
    const toast = useRef<Toast>(null);

    const handleDeleteUser = async () => {
        try {
            await deleteUser(user.id);
            showSuccess(toast, FIREBASE_SUCCESS_MAP['auth/user-deleted']);
            OnClose();
        } catch (err: any) {
            const errorCode = err.code || err.message?.match(/\(([^)]+)\)/)?.[1] || '';
            const detail = FIREBASE_ERROR_MAP[errorCode];
            showError(toast, detail ?? 'Error al eliminar usuario');
        }
    };

    return (
        <div className="">
            <div className="">
                <div className="">
                    <Toast ref={toast} />
                    <div className="">
                        <div className="grid formgrid p-fluid">
                            <i className="pi pi-exclamation-circle text-2xl mr-2 ml-2 "></i>
                            <div className="field text-xl">¿Quiere descatalogar al usuario '{user.name}'?</div>
                        </div>
                    </div>
                    <div className="flex justify-content-between col-12 mt-6">
                        <Button label="Salir" icon="pi pi-times" outlined severity="secondary" onClick={OnClose} />
                        <Button label="Delete User" icon="pi pi-check" onClick={handleDeleteUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;
