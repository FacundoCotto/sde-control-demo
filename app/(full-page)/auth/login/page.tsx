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
    const { login, isSubmitting, toast } = useLogin();
    const filledInput = layoutConfig.inputStyle === 'filled';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            await login(email, password);
            router.push('/users/list');
        } catch (err: any) {}
    };

    return (
        <div className={classNames('surface-ground h-screen w-screen flex align-items-center justify-content-center relative', { 'p-input-filled': filledInput })}>
            <div className="py-7 px-5 sm:px-7 flex flex-column w-11 sm:w-30rem" style={{ borderRadius: '14px' }}>
                <div className="w-20rem flex justify-content-center">
                    <img src="/layout/images/logo-sdecontrol.svg" alt="" />
                </div>

                <Toast ref={toast} />

                <span className="mb-4 flex justify-content-center">
                    <InputText type="text" placeholder="Email" value={email} className="w-10" onChange={(e) => setEmail(e.target.value)} />
                </span>

                <span className="mb-4 flex justify-content-center ">
                    <InputText type="password" placeholder="Password" value={password} className="w-10" onChange={(e) => setPassword(e.target.value)} />
                </span>

                <span className="mb-4 flex justify-content-center">
                    <Button label={isSubmitting ? 'Ingresando...' : 'Sign In'} className="w-10" onClick={handleSubmit} disabled={isSubmitting} loading={isSubmitting}></Button>
                </span>
            </div>
            <div className="flex items-baseline absolute bottom-0 pb-[70px] mb-8 left-0 right-0 justify-content-center">
                <h4 className="font-bold leading-[22px] m-0 mr-8">V-Guard CONTROL</h4>
                <h6 className="font-medium leading-[17px] m-0 text-gray-400">Copyright Ⓒ V-Guard SOFTWARE</h6>
            </div>
        </div>
    );
};

export default Login;
