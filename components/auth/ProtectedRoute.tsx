'use client';
import { useAuth } from '@/firebase/context/authcontext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth/login');
        }
    }, [user, loading, router]);
    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <ProgressSpinner />
            </div>
        );
    }
    if (!user) return null;
    return <>{children}</>;
}
