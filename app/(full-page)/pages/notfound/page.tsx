'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React from 'react';
import { useAuth } from '@/firebase/context/authcontext';

function NotFound() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return null;

    const destination = user ? '/users/list' : '/auth/login';
    const label = user ? 'Go to Users' : 'Go to Login';
    const linkText = user ? 'users' : 'login';

    const navigate = () => router.push(destination);

    return (
        <React.Fragment>
            <div className="surface-ground h-screen w-screen flex align-items-center justify-content-center">
                <div className="surface-card py-7 px-5 sm:px-7 shadow-2 flex flex-column w-11 sm:w-30rem" style={{ borderRadius: '14px' }}>
                    <h1 className="font-bold text-2xl mt-0 mb-2">NOT FOUND</h1>
                    <p className="text-color-secondary mb-4">
                        Looks like you are lost. You may try these or go back to{' '}
                        <a onClick={navigate} className="font-bold text-primary hover:underline" style={{ cursor: 'pointer' }}>
                            {linkText}
                        </a>
                        .
                    </p>
                    <Button onClick={navigate} label={label} className="mt-4"></Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFound;
