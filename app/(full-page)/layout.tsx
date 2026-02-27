import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated';

interface FullPageLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Sde Control',
    description: 'Sistema de Control de Usuarios'
};

export default function FullPageLayout({ children }: FullPageLayoutProps) {
    return (
        <RedirectIfAuthenticated>
            <React.Fragment>
                {children}
                <AppConfig minimal />
            </React.Fragment>
        </RedirectIfAuthenticated>
    );
}
