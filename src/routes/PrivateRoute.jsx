import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // লোডিং অবস্থায় একটি স্পিনার দেখানো ভালো, যাতে পেজ হুট করে রিডাইরেক্ট না হয়
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center font-bold text-indigo-600">Loading...</div>;
    }

    if (user) {
        return children;
    }

    // লগইন না থাকলে তাকে লগইন পেজে পাঠিয়ে দেবে
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;