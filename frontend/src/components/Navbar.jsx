// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/signup" className="hover:text-gray-300">
            Signup
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
