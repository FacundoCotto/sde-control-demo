import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/lib/firebaseAdmin';
import { adminDb } from '@/firebase/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, user, userType, panelUser, homePage } = body;
        // 1. Crear usuario en Firebase Authentication
        const userRecord = await adminAuth.createUser({
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            uid: userRecord.uid // vincular con el UID de Authentication
        };
        await adminDb.ref(`usuarios/${userRecord.uid}`).set(userData);
        return NextResponse.json({ uid: userRecord.uid }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
