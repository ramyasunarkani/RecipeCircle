import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signup } from "../Store/authActions";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSigningUp = useSelector((state) => state.auth.isSigningUp);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(signup(formData));
      navigate("/"); 
    } catch (error) {
      toast.error(error?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  py-16">
      <div className="bg-white p-10 shadow-xl rounded-2xl w-full max-w-md border border-[#1E4B6D]">
        <h2 className="text-3xl font-bold mb-8 text-[#1E4B6D] text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#1E4B6D] font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B6D] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#1E4B6D] font-medium mb-2">
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B6D] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-[#1E4B6D] font-medium mb-2">
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B6D] transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-[#1E4B6D] font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B6D] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="bg-[#1E4B6D]  py-2 rounded-lg hover:bg-[#153750] transition duration-200"
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm ">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold  text-[#153750]">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
