import { db } from './firebase';
import {
    ref,
    get,
    set,
    push,
    update,
    remove,
    child
} from 'firebase/database';
export interface UserData {
    nombre: string;
    user: string;
    email: string;
    clave: string;
    tipoUsuario: string;
    usuarioDePanel: boolean;
    paginaDeInicio: string;
    creadoEn: string;
    actualizadoEn: string;
}
export interface User extends UserData {
    id: string;
}
const USERS_REF = 'usuarios';
export async function createUser(data: UserData): Promise<string> {
    const newUserRef = push(ref(db, USERS_REF));
    await set(newUserRef, data);
    return newUserRef.key!;
}
export async function getUsers(): Promise<User[]> {
    const snapshot = await get(ref(db, USERS_REF));
    if (!snapshot.exists()) {
        return [];
    }
    const data = snapshot.val();
    return Object.entries(data).map(([id, userData]) => ({
        id,
        ...(userData as UserData),
    }));
}

export async function getUserById(id: string): Promise<User | null> {
    const snapshot = await get(child(ref(db, USERS_REF), id));
    if (!snapshot.exists()) {
        return null;
    }
    return {
        id,
        ...(snapshot.val() as UserData),
    };
}

export async function updateUser(id: string, data: Partial<UserData>): Promise<void> {
    const userRef = ref(db, `${USERS_REF}/${id}`);
    await update(userRef, data);
}

export async function deleteUser(id: string): Promise<void> {
    const userRef = ref(db, `${USERS_REF}/${id}`);
    await remove(userRef);
}
