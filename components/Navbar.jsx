import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router'; // Ensure correct import for React Router

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get the current location

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-lg">
          <Link to="/home">Recipe Book</Link>
        </h2>
        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 mx-4">
          <li
            className={`px-4 py-2 rounded-full ${
              isActive('/home') ? 'bg-white text-black' : 'hover:bg-gray-700'
            }`}
          >
            <Link to="/home">Home</Link>
          </li>
          <li
            className={`px-4 py-2 rounded-full ${
              isActive('/recipes') ? 'bg-white text-black' : 'hover:bg-gray-700'
            }`}
          >
            <Link to="/recipes">My Recipes</Link>
          </li>
          <li
            className="relative px-4 py-2 rounded-full hover:bg-gray-700"
            ref={dropdownRef}
          >
            <button onClick={toggleDropdown} className="focus:outline-none">
              Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white text-black p-4 rounded shadow-lg z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/settings">Settings</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <button onClick={() => alert('Logged out')}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-4 p-4">
            <li
              className={`px-4 py-2  ${
                isActive('/home') ? 'bg-white text-black' : 'hover:bg-gray-700'
              }`}
            >
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={`px-4 py-2  ${
                isActive('/recipes') ? 'bg-white text-black' : 'hover:bg-gray-700'
              }`}
            >
              <Link to="/recipes" onClick={() => setMenuOpen(false)}>
                My Recipes
              </Link>
            </li>
            <li className="relative px-4 py-2  hover:bg-gray-700">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none "
              >
                Account
              </button>
              {dropdownOpen && (
                <div
                  className="mt-2 bg-white text-black p-4 rounded shadow-lg z-50"
                  ref={dropdownRef}
                >
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <a href="/settings" onClick={() => setMenuOpen(false)}>
                        Settings
                      </a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <button
                        onClick={() => {
                          // alert('Logged out');
                          window.location.href = '/home';
                          setMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;