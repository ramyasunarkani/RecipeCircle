import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../Store/authActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);
  const authUser = useSelector((state) => state.auth.authUser);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)); 
      navigate("/"); 
    } catch (error) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-[#1E4B6D]">
        <h2 className="text-3xl font-bold mb-6 text-[#1E4B6D] text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-blue-900 font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-blue-900 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="bg-[#1E4B6D] text-white py-2 rounded-lg hover:bg-[#0b324f] transition duration-200"
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Not registered yet?{" "}
          <Link to="/signup" className="text-[#1E4B6D] font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
