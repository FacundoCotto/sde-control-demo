import { useCallback, useState } from 'react';
import { useAuth } from '../context/authcontext';

function useLogin() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = useCallback(async (email: string, password: string) => {
        setError(null);
        setIsSubmitting(true);
        try {
            await login(email, password);
        } catch (err: any) {
            if (err.message === 'Firebase: Error (auth/invalid-credential).') {
                setError('Usuario o contraseña incorrectos');
            } else if (err.message === 'Firebase: Error (auth/too-many-requests).') {
                setError('Demasiados intentos fallidos');
            } else if (err.message === 'Firebase: Error (auth/user-not-found).') {
                setError('Usuario no encontrado');
            } else {
                setError('Error al iniciar sesión');
            }
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    }, [login]);

    return {
        login: handleLogin,
        isSubmitting,
        error,
        resetError: () => setError(null)
    };
}

export default useLogin;
