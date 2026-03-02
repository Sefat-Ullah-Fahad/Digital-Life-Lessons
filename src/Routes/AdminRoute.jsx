import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // যদি অথেন্টিকেশন বা অ্যাডমিন চেক লোড হতে থাকে
    if (loading || isAdminLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    // যদি ইউজার লগইন করা থাকে এবং সে অ্যাডমিন হয়
    if (user && isAdmin) {
        return children;
    }

    // যদি অ্যাডমিন না হয়, তবে তাকে হোম বা লগইন পেজে পাঠিয়ে দিন
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;