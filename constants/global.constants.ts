type detail = React.ReactNode | undefined;

export const FIREBASE_ERROR_MAP: Record<string, detail> = {
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/too-many-requests': 'Demasiados intentos fallidos',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-email': 'Email inválido',
};

export const FIREBASE_SUCCESS_MAP: Record<string, detail> = {
    'auth/user-created': 'Usuario creado exitosamente',
    'auth/user-updated': 'Usuario actualizado exitosamente',
    'auth/user-deleted': 'Usuario eliminado exitosamente',
};
