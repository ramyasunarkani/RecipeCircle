import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllUsers,
  approveUser,
  banUser,
  fetchAllRecipes,
  deleteRecipe,
} from "../Store/adminActions";
import { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, recipes, loading, error } = useSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (activeTab === "users") dispatch(fetchAllUsers());
    else dispatch(fetchAllRecipes());
  }, [dispatch, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <Toaster />
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <button
          className={`mb-2 text-left px-2 py-1 rounded ${
            activeTab === "users" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Manage Users
        </button>

        <button
          className={`mb-2 text-left px-2 py-1 rounded ${
            activeTab === "recipes" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("recipes")}
        >
          Manage Recipes
        </button>

        <button
          className="mt-auto bg-red-500 px-2 py-1 rounded text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {activeTab === "users" && (
          <UsersTable users={users} dispatch={dispatch} />
        )}

        {activeTab === "recipes" && (
          <RecipesTable recipes={recipes} dispatch={dispatch} />
        )}
      </main>
    </div>
  );
};

const UsersTable = ({ users, dispatch }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Users</h3>
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Email</th>
          <th className="border px-2 py-1">Status</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => {
          const status = user.is_banned
            ? "Banned"
            : user.is_approved
            ? "Approved"
            : "Pending";

          return (
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td
                className={`border px-2 py-1 font-medium ${
                  user.is_banned
                    ? "text-red-600"
                    : user.is_approved
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {status}
              </td>
              <td className="border px-2 py-1 space-x-2">
                {!user.is_approved && !user.is_banned && (
                  <button
                    className="bg-green-500 px-2 py-1 rounded text-white"
                    onClick={() => dispatch(approveUser(user.id))}
                  >
                    Approve
                  </button>
                )}
                {!user.is_banned ? (
                  <button
                    className="bg-red-500 px-2 py-1 rounded text-white"
                    onClick={() => dispatch(banUser(user.id))}
                  >
                    Ban
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 px-2 py-1 rounded text-white"
                    onClick={() => dispatch(approveUser(user.id))}
                  >
                    Unban
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const RecipesTable = ({ recipes, dispatch }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Recipes</h3>
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-2 py-1">Title</th>
          <th className="border px-2 py-1">Author</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {recipes?.map((recipe) => (
          <tr key={recipe.id}>
            <td className="border px-2 py-1">{recipe.title}</td>
            <td className="border px-2 py-1">{recipe.author?.name}</td>
            <td className="border px-2 py-1">
              <button
                className="bg-red-500 px-2 py-1 rounded text-white"
                onClick={() => dispatch(deleteRecipe(recipe.id))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
