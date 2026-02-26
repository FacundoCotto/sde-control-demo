import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated';

interface FullPageLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'PrimeReact Verona',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.'
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
