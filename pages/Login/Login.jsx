import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import api from '../../util/api';

import Toast from '../../components/Toast';


function Login() {
    const location = useLocation();    
    const navigate = useNavigate();

    const [toastMessage, setToastMessage] = useState("");

    // Check if the user was logged out successfully
    useEffect(() => {
        if (location.state?.loggedOut) { // location.state && location.state.loggedOut
            setToastMessage("Logged out successfully");
        }
    }, [location.state]); // Run this effect only when location.state changes

    const toHome = () => { 
        navigate('/home');
    }

    const handleSubmit = async (e) => {
        const username = e.target.username.value;
        const password = e.target.password.value;
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                username,
                password
            });

            // Handle success response
            if (response.status === 200) {
                setToastMessage("User logged in successfully"); // Show toast message
                setTimeout(() => {
                    navigate('/home'); // Redirect to home page after 3 seconds
                }, 1500);
            } else {
                // alert("Error logging in");
                setToastMessage("Error logging in");
            }
        } catch (err) {
            // Handle error response
            if (err.response && err.response.status === 400) {
                // alert(err.response.data.message);
                setToastMessage(err.response.data.message);
            } else {
                // alert("An error occurred. Please try again later.");
                setToastMessage("An error occurred. Please try again later.");
            }
            // Log the error for debugging
            console.error(err);
            // alert("Error logging in");
            setToastMessage("Error logging in");
        }
    }


    return (

        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-14'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:w-sm border-gray-500 border-1 rounded-lg p-6'>
                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <input type="username" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' value={"rok"} required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' value={"123"} required />
                    <div>
                        <input type="checkbox" id="remember" className='mr-2' />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>
                <button type="submit" className='bg-gray-900 text-white font-bold px-6 py-3 mt-12 mb-2 cursor-pointer hover:bg-gray-800'>Login</button>
                <div>
                    <p className='text-center mt-4'>Don't have an account? <a href="/register" className='text-blue-500'>Register</a></p>

                </div>
            </form>

            {/* Toast Component */}
            <Toast 
                message={toastMessage} 
                duration={3000} // Duration in milliseconds it will disappear in 3 seconds
                onClose={() => setToastMessage("")} // Clear the message when closed
            />
        </div>
    )
}

export default Login