import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // Ensure correct import for React Router
import api from '../util/api'; // Adjust the import path as necessary

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // For navigation


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

  const handleLogout = async (e) => {
    // Perform logout logic here
    e.preventDefault();

    try {
      const response = await api.get('/auth/logout')

      // Handle success response
      if (response.status === 200) {
        // alert('Logged out successfully');
        // window.location.href = '/login'; // Redirect to home page
        navigate('/login', { state: { loggedOut: true } }); // Use navigate to redirect
      } else {
        navigate(location.pathname, { state: { loggedOut: true, message: "Error logging out" } })

        // alert('Error logging out');
      }
    } catch (err) {
      // Handle error response
      if (err.response && err.response.status === 400) {
        // alert(err.response.data.message);
        navigate(location.pathname, { state: { loggedOut: true, message: err.response.data.message } })
      } else {
        // alert('An error occurred. Please try again later.');
        navigate(location.pathname, { state: { loggedOut: true, message: "An error occurred. Please try again later." } })
      }
      // Log the error for debugging
      console.error(err);
      navigate(location.pathname, { state: { loggedOut: true, message: "Error logging out" } })
      // alert('Error logging out');
    }
  }

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
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
        <NavigationMenu className='hidden md:flex h-full items-stretch'>
          <NavigationMenuList className='flex h-full items-stretch space-x-2'>
            <NavigationMenuItem >
              <NavigationMenuLink asChild>
                <Link to={"/home"}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={"/recipes"}>
                  My Recipes
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary">
                Account
              </NavigationMenuTrigger>
              <NavigationMenuContent className='relative'>
                <ul className="grid md:w-[250px] gap-3 p-4">
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <Link to={"/settings"}>
                        Settings
                      </Link>
                    </NavigationMenuLink>

                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link onClick={handleLogout}>
                        Logout
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <ul className="hidden md:flex space-x-10 mx-4">
          <li
            className={`px-4 py-2 rounded ${isActive('/home') ? 'bg-white text-black' : 'hover:bg-gray-700'
              }`}
          >
            <Link to="/home">Home</Link>
          </li>
          <li
            className={`px-4 py-2 rounded ${isActive('/recipes') ? 'bg-white text-black' : 'hover:bg-gray-700'
              }`}
          >
            <Link to="/recipes">My Recipes</Link>
          </li>
          <li
            className="relative px-4 py-2 rounded hover:bg-gray-700"
            ref={dropdownRef}
          >
            <button onClick={toggleDropdown} className="focus:outline-none">
              Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white text-black p-4 rounded shadow-lg z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/settings" onClick={() => setMenuOpen(false)}>
                      Settings
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/home" onClick={handleLogout}>Log out</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul> */}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-4 p-4">
            <li
              className={`px-4 py-2  ${isActive('/home') ? 'bg-white text-black' : 'hover:bg-gray-700'
                }`}
            >
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={`px-4 py-2  ${isActive('/recipes') ? 'bg-white text-black' : 'hover:bg-gray-700'
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
                      <Link to="/settings" onClick={() => setMenuOpen(false)}>
                        Settings
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link onClick={handleLogout}>Log out</Link>
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