import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/authActions";
import ProfileSidebar from "./ProfileSidebar";
import EditProfile from "./EditProfile";
import MyRecipes from "./MyRecipes";
import Collections from "./Collections";
import Favorites from "./Favorites";
import Following from "./Following";
import toast, { Toaster } from "react-hot-toast";

const ProfileLayout = () => {
  const { authUser } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = React.useState("edit-profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "edit-profile":
        return <EditProfile />;
      case "my-recipes":
        return <MyRecipes />;
      case "collections":
        return <Collections />;
      case "favorites":
        return <Favorites />;
      case "following":
        return <Following />;
      default:
        return <EditProfile />;
    }
  };

  // If user is banned, show message and logout only
  if (authUser?.is_banned) {
    toast.error("Your account is banned!", { duration: 3000 });
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <Toaster position="top-right" reverseOrder={false} />
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          You are banned
        </h2>
        <p className="mb-6 text-gray-700">
          You cannot access your profile or any features.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  // Normal profile layout for non-banned users
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">{renderTab()}</main>
    </div>
  );
};

export default ProfileLayout;
