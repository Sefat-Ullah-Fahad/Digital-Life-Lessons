import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু কন্ট্রোল করার জন্য

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      {/* সাইডবার */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> 

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* হেডার */}
        <DashboardHeader setIsOpen={setIsOpen} />

        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="p-4 lg:p-10 flex-1 overflow-y-auto">
          <div className="">
             <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;