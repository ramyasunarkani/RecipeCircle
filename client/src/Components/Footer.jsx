import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1E4B6D] text-white py-4 mt-auto w-full ">
      <div className="container mx-auto text-center flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        <div className="flex gap-6">
          <Link
            to="/admin/login"
            className="text-white hover:text-gray-300 font-medium"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 font-medium"
          >
            About
          </Link>
        </div>

        <p className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} RecipeCircle. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
