import { Outlet } from "react-router";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import AdminHeader from "../components/Dashboard/AdminHeader"; // নতুন ইমপোর্ট

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            
            {/* অ্যাডমিন সাইডবার */}
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* অ্যাডমিন হেডার */}
                <AdminHeader />
                
                {/* মেইন কন্টেন্ট এরিয়া */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;