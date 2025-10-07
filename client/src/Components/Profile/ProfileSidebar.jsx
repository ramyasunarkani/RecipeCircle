import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authActions";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { id: "edit-profile", label: "Edit Profile" },
    { id: "my-recipes", label: "My Recipes" },
    { id: "collections", label: "Collections" },
    { id: "favorites", label: "Favorites" },
    { id: "following", label: "Following" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src={authUser?.avatar_url || "/avatar.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full border mb-3"
          />
          <h2 className="text-lg font-semibold text-[#1E4B6D]">
            {authUser?.name}
          </h2>
          <p className="text-sm text-gray-500">{authUser?.email}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                activeTab === item.id
                  ? "bg-[#1E4B6D] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#1E4B6D] hover:bg-[#163850] text-white py-2 rounded-md"
        >
          Go Back Home
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
