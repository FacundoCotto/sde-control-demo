'use client';
import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Page } from '../../../../types/layout';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import useLogin from '../../../../firebase/hooks/useLogin';
import { Toast } from 'primereact/toast';

const Login: Page = () => {
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const { login, isSubmitting, error } = useLogin();
    const filledInput = layoutConfig.inputStyle === 'filled';
    const toast = useRef<Toast>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            await login(email, password);
            router.push('/users/list');
        } catch (err: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error,
                life: 3000
            });
        }
    };

    return (
        <div className={classNames('surface-ground h-screen w-screen flex align-items-center justify-content-center', { 'p-input-filled': filledInput })}>
            <div className="surface-card py-7 px-5 sm:px-7 flex flex-column w-11 sm:w-30rem" style={{ borderRadius: '14px' }}>
                <div className="w-20rem flex justify-content-center">
                    <img src="/layout/images/logo-sdecontrol.svg" alt="" />
                </div>

                <Toast ref={toast} />

                <span className="p-input-icon-left mb-4">
                    <i className="pi pi-user"></i>
                    <InputText type="text" placeholder="Email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>

                <span className="p-input-icon-left mb-4">
                    <i className="pi pi-key"></i>
                    <InputText type="password" placeholder="Password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                </span>

                <Button label={isSubmitting ? 'Ingresando...' : 'Sign In'} className="mb-4" onClick={handleSubmit} disabled={isSubmitting} loading={isSubmitting}></Button>
                <div className="flex align-items-center justify-content-center mt-4 ">
                    <h4 className="font-bold">V-Guard CONTROL</h4>
                    <h6 className="font-bold">Copyright Ⓒ V-Guard SOFTWARE</h6>
                </div>
            </div>
        </div>
    );
};

export default Login;
