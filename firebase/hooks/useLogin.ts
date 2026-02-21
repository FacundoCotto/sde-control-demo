import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { Toast } from 'primereact/toast';

function useLogin() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    const handleLogin = useCallback(async (email: string, password: string) => {
        setIsSubmitting(true);
        try {
            await login(email, password);
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful',
                life: 1000
            });
        } catch (err: any) {
            if (err.message === 'Firebase: Error (auth/invalid-credential).') {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Credenciales inválidas",
                    life: 1000
                });
            } else if (err.message === 'Firebase: Error (auth/too-many-requests).') {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Demasiados intentos fallidos",
                    life: 1000
                });
            } else if (email.trim() === "" || password.trim() === "") {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Error',
                    detail: "Ingrese email y contraseña",
                    life: 1000
                });
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Error al iniciar sesión",
                    life: 1000
                });
            }
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, [login]);

    return {
        login: handleLogin,
        isSubmitting,
        toast,
    };
}

export default useLogin;
