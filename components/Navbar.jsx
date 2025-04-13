import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { Link, useLocation } from 'react-router'

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get the current location

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

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
  }, [])

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='bg-gray-800 text-white flex justify-between items-center p-4'>
      <h2 className='font-bold'><Link to="/home">Recipe Book</Link></h2>
      <div>
        <ul className='flex space-x-10 mx-4'>
          <li className={`px-4 py-2 rounded-full ${isActive('/home') ? 'bg-white text-black':'hover:bg-gray-700'}`}><Link to="/home">Home </Link ></li>
          <li className={`px-4 py-2 rounded-full ${isActive('/recipes') ? 'bg-white text-black':'hover:bg-gray-700'}`}><Link to="/recipes">My Recipes</Link></li>
          <li className='relative px-4 py-2 rounded-full hover:bg-gray-700' ref={dropdownRef}>
            <button onClick={toggleDropdown} className='focus:outline-none'>
              Account
            </button>
            {dropdownOpen && (
              <div className='absolute right-0 mt-4 w-48 bg-white text-black p-4 rounded shadow-lg'>
                <ul>
                  <li className='px-4 py-2 hover:bg-gray-200'>
                    <a href="/settings">Settings</a>
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-200'>
                    <button onClick={() => alert("logged out")}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>


  )
}

export default Navbar