import { Metadata } from 'next';
import Layout from '../../layout/layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Sde Control',
    description: 'Sistema de Control de Usuarios',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' }
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <ProtectedRoute><Layout>{children}</Layout></ProtectedRoute>;
}
