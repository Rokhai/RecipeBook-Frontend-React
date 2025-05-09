import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar.jsx';
import MainLayout from '../../components/Layout/MainLayout.jsx';
import api from '../../util/api'; // Import the API utility
import Toast from '../../components/Toast.jsx';

import { Link, useLocation, useNavigate } from 'react-router'; // Import necessary hooks from react-router-dom
function Home() {
    const [profile, setProfile] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/auth/profile');
                setProfile(response.data.user); // Set the user object from the response
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setToastMessage("Unauthorized access. Please log in.");
                    // alert('Unauthorized access. Please log in.');
                    // console.error('Unauthorized access:', error);
                    // window.location.href = '/login'; // Redirect to login page
                }
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);

    // Handle the case when the user unable to logout
    useEffect(() => {

        const loggingOut = async () => {
            const loggedOut = location.state?.loggedOut;

            if (loggedOut) {
                setToastMessage(location.state.message || "Error logging out");
                // alert('Logged out successfully');
                // Clear the loggedOut state after showing the message
            }
        }

        loggingOut(); // Call the function to check if the user logged out

    }, [location.state]); // Run this effect only when location.state changes

    return (

        <MainLayout>

            <div className='flex flex-col items-center justify-center h-screen'>
                {/* <h1>Welcome to the Home Page</h1> */}
                {/* <p>This is a protected route. You should be logged in to see this.</p> */}
                {profile ? (
                    <div className='flex flex-col items-center t'>
                        <h1 className='text-8xl'>Welcome, {profile.name}</h1>
                        <h2 className='text-2xl'>Ready to manage your recipe?</h2>
                        <Link to="/recipes">
                            <button className='bg-gray-900 text-white font-bold py-2 px-4 hover:bg-gray-700 rounded'>
                                Manage Recipe
                            </button>
                        </Link>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>

            <Toast
                message={toastMessage} // Use the toastMessage from location.state
                duration={3000} // Duration in milliseconds
                onClose={() => setToastMessage("")} // Clear the message after 3 seconds
                position="bottom-right" // Position of the toast
            />
        </MainLayout>

    );
}

export default Home;