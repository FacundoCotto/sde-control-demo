import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/lib/firebaseAdmin';
import { adminDb } from '@/firebase/lib/firebaseAdmin';

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;
        // 1. Crear usuario en Firebase Authentication
        await adminAuth.deleteUser(id);
        // 2. Guardar datos adicionales en Realtime Database
        await adminDb.ref(`usuarios/${id}`).remove();
        return NextResponse.json({ uid: id }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
