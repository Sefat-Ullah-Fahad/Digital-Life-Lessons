import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllLessons from "../pages/AllLessons/AllLessons";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import UserHome from "../pages/UserDashboard/UserHome";
import AddLesson from "../pages/UserDashboard/AddLesson";
import MyLessons from "../pages/UserDashboard/MyLessons";
import MyProfile from "../pages/UserDashboard/MyProfile";
import PrivateRoute from "./PrivateRoute";
import MyFavorites from "../pages/UserDashboard/MyFavorites";
import UpdateLesson from "../pages/UserDashboard/UpdateLesson";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "public-lessons",
        Component: AllLessons,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    // এখানে element ব্যবহার করা সবচেয়ে নিরাপদ পদ্ধতি
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "user-home",
        Component: UserHome,
      },
      {
        path: "add-lesson",
        Component: AddLesson,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "my-favorites",
        Component: MyFavorites,
      },
      {
        path: "update-lesson/:id", 
        Component: UpdateLesson
      },
    ],
  },


  {
    path: "*",
    element: <NotFound />
  }


]);
