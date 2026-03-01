import { createBrowserRouter, Navigate } from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllLessons from "../pages/AllLessons/AllLessons";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout"; // নতুন অ্যাডমিন লেআউট
import UserHome from "../pages/UserDashboard/UserHome";
import AddLesson from "../pages/UserDashboard/AddLesson";
import MyLessons from "../pages/UserDashboard/MyLessons";
import MyProfile from "../pages/UserDashboard/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute"; 
import MyFavorites from "../pages/UserDashboard/MyFavorites";
import UpdateLesson from "../pages/UserDashboard/UpdateLesson";
import NotFound from "../pages/NotFound";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import AuthorProfile from "../pages/AuthorProfile/AuthorProfile";

// Admin Pages
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageLessons from "../pages/AdminDashboard/ManageLessons";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import ReportedLessons from "../pages/AdminDashboard/ReportedLessons";
import AdminHome from "../pages/AdminDashboard/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <AllLessons /> },
      { path: "lesson/:id", element: <LessonDetails /> },
      { path: "author/:email", element: <AuthorProfile /> },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // --- ১. মেম্বার ড্যাশবোর্ড (লগইন করা ইউজারদের জন্য) ---
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard/user-home" replace /> },
      { path: "user-home", element: <UserHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "profile", element: <MyProfile /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "update-lesson/:id", element: <UpdateLesson /> },
    ],
  },

  // --- ২. অ্যাডমিন প্যানেল (সম্পূর্ণ আলাদা লেআউট ও সিকিউরিটি) ---
 {
    path: "/admin-panel",
    element: (
      <AdminRoute>
        <AdminLayout /> 
      </AdminRoute>
    ),
    children: [
      // ১. ডিফল্টভাবে অ্যাডমিন হোম বা ওভারভিউতে নিয়ে যাবে
      { 
        index: true, 
        element: <Navigate to="/admin-panel/home" replace /> 
      },
      {
        path: "home", // Admin Dashboard Home
        element: <AdminHome />, 
      },
      {
        path: "manage-users", // Manage Users
        element: <ManageUsers />,
      },
      {
        path: "manage-lessons", // Manage Lessons
        element: <ManageLessons />,
      },
      {
        path: "reported-lessons", // Reported/Flagged Lessons
        element: <ReportedLessons />,
      },
      {
        path: "profile", // Admin Profile
        element: <AdminProfile />,
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />
  }
]);