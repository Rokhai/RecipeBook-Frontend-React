import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // Import necessary hooks from react-router-dom
import MainLayout from '../../components/Layout/MainLayout.jsx';

import { Toaster } from '@/components/ui/sonner.js';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.js';
import { LoaderCircle } from 'lucide-react';
import api from '../../util/api'; // Import the API utility

export default function Home() {
    const [profile, setProfile] = useState(false);

    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/auth/profile');
                setProfile(response.data.user); // Set the user object from the response

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error("Unauthorized access. Please log in. You will be redirected to the login page.");
                    setTimeout(() => {
                        navigate('/login'); // Redirect to login page if unauthorized
                    }, 3000); // Redirect after 3 seconds
                } else if (error.response && error.response.status === 404) {
                    toast.error("Profile not found. Please check your account.");
                } else {
                    console.error('Error fetching data:', error);
                    toast.error("Error fetching profile data. Please try again later.");
                }
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);

    // Handle the case when the user unable to logout
    useEffect(() => {

        const loggingOut = async () => {
            const loggedOut = location.state?.loggedOut;

            if (loggedOut) {
                toast.error("Error logging out. Please try again.");
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page if there was an error logging out
                }, 3000); // Redirect after 3 seconds
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
                        <h1 className='text-4xl md:text-8xl '>Welcome, {profile.name}</h1>
                        <h2 className='text-base md:text-2xl'>Ready to manage your recipe?</h2>
                        <Link to="/recipes">
                            <Button>
                                Manage Recipe
                            </Button>
                        </Link>


                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center space-y-4'>

                        <LoaderCircle className='animate-spin h-24 w-24 text-gray-900' />
                        <p>Loading profile...</p>
                    </div>

                )}
            </div>
            <Toaster position='top-center' duration={2000} closeButton />
        </MainLayout>
    );
}