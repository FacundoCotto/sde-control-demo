import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/lib/firebaseAdmin';
import { adminDb } from '@/firebase/lib/firebaseAdmin';

export async function PUT(request: NextRequest) {
    try {

        const body = await request.json();
        const { email, password, name, user, userType, panelUser, homePage, id } = body;

        // 1. Crear usuario en Firebase Authentication
        await adminAuth.updateUser(id, {
            email,
            password,
            displayName: name,
        });
        // 2. Guardar datos adicionales en Realtime Database
        const userData = {
            name,
            user,
            email,
            password, // Considerá si realmente querés guardar el password en la DB
            userType,
            panelUser,
            homePage,
            updatedAt: new Date().toISOString(),
        };
        await adminDb.ref(`usuarios/${id}`).update(userData);
        return NextResponse.json({ uid: id }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
