import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // ইউজার লোড হওয়ার পর রান হবে
       queryFn: async () => {
    const res = await fetch(`http://localhost:3000/users/admin/${user?.email}`);
    const data = await res.json();
    console.log("Admin Status From DB:", data); // এই লাইনটি যোগ করুন
    return data?.admin;
}
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;