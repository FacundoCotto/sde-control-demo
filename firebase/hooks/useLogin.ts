import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { Toast, ToastMessage } from 'primereact/toast';

type severity = 'success' | 'error' | 'warn' | 'info' | undefined;
type detail = React.ReactNode | undefined;
type summary = React.ReactNode | undefined;

const FIREBASE_ERROR_MAP: Record<string, ToastMessage> = {
    'auth/invalid-credential': { severity: 'error', detail: 'Credenciales inválidas' },
    'auth/too-many-requests': { severity: 'error', detail: 'Demasiados intentos fallidos' },
};

function useLogin() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const showToast = useCallback((severity: severity, detail: detail, summary: summary) => {
        toast.current?.show({ severity, summary, detail, life: 1000 });
    }, []);

    const handleLogin = useCallback(
        async (email: string, password: string) => {
            setIsSubmitting(true);
            if (email.trim() === "" || password.trim() === "") {
                showToast('warn', 'Ingrese email y contraseña', 'Error');
                setIsSubmitting(false);
                throw new Error('Ingrese email y contraseña');
            }
            try {
                await login(email, password);
                showToast('success', 'Login successful', 'Success');
            } catch (err: any) {
                const errorCode = err.code || err.message?.match(/\(([^)]+)\)/)?.[1] || '';
                const mapped = FIREBASE_ERROR_MAP[errorCode];
                showToast(
                    mapped?.severity ?? 'error',
                    mapped?.detail ?? 'Error al iniciar sesión',
                    mapped?.summary ?? 'Error'
                );
                throw err;
            } finally {
                setIsSubmitting(false);
            }
        },
        [login, showToast]
    );

    return {
        login: handleLogin,
        isSubmitting,
        toast
    };
}

export default useLogin;
