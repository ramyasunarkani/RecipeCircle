import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ShareRecipe from "./Pages/ShareRecipe";
import Home from "./Pages/Home";
import RecipeDetails from "./Components/RecipeDetails/RecipeDetails";
import Profile from "./Pages/Profile";
import AllAuthors from "./Pages/AllAuthors";

import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import AdminDashboard from "./Pages/AdminDashboard"; 

import { setAuthUser } from "./Store/authSlice";
import { fetchFavorites } from "./Store/favoriteActions";
import { fetchCollections } from "./Store/collectionActions";
import { fetchRecipes } from "./Store/recipeActions";
import { setAdminUser } from "./Store/adminAuthSlice"; 

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const adminUser = useSelector((state) => state.adminAuth.adminUser);
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/admin");

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedAdmin = localStorage.getItem("adminUser");

    if (storedUser) dispatch(setAuthUser(JSON.parse(storedUser)));
    if (storedAdmin) dispatch(setAdminUser(JSON.parse(storedAdmin)));

    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchFavorites());
      dispatch(fetchCollections());
    }
  }, [authUser, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      {!hideNavbar && <Header />}
      {!hideNavbar && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              authUser ? (
                <Navigate to="/" replace />
              ) : adminUser ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" replace /> : <SignupPage />}
          />

          {/* User Protected Routes */}
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="/share-recipe" element={<ShareRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/authors" element={<AllAuthors />} />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              adminUser ? (
                <Navigate to="/admin/dashboard" replace />
              ) : authUser ? (
                <Navigate to="/" replace />
              ) : (
                <AdminLogin />
              )
            }
          />
          <Route
            path="/admin/signup"
            element={
              adminUser ? (
                <Navigate to="/admin/dashboard" replace />
              ) : authUser ? (
                <Navigate to="/" replace />
              ) : (
                <AdminSignup />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              adminUser ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
