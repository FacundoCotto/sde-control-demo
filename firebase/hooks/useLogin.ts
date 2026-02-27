import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { Toast } from 'primereact/toast';
import { showError, showSuccess } from '@/services/toastService';
import { FIREBASE_ERROR_MAP } from '@/constants/global.constants';

function useLogin() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const handleLogin = useCallback(
        async (email: string, password: string) => {
            setIsSubmitting(true);
            if (email.trim() === "" || password.trim() === "") {
                showError(toast, 'Ingrese email y contraseña');
                setIsSubmitting(false);
                throw new Error('Ingrese email y contraseña');
            }
            try {
                await login(email, password);
                showSuccess(toast, 'Login successful');
            } catch (err: any) {
                const errorCode = err.code || err.message?.match(/\(([^)]+)\)/)?.[1] || '';
                const detail = FIREBASE_ERROR_MAP[errorCode];
                showError(toast, detail ?? 'Error al iniciar sesión');
                throw err;
            } finally {
                setIsSubmitting(false);
            }
        },
        [login]
    );

    return {
        login: handleLogin,
        isSubmitting,
        toast
    };
}

export default useLogin;
