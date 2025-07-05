import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import api from '../../util/api';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from '@/components/ui/sonner';
import {toast} from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const logoutNotification = () => {
            
            // Check if the user was logged out successfully
            if (location.state?.loggedOut) { // location.state && location.state.loggedOut
                // setToastMessage("Logged out successfully");
                toast.success("Logged out successfully", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                });
                // location.state.loggedOut = false; // Reset the loggedOut state
    
                // Clear the loggedOut state after showing the message
                navigate(location.pathname, { replace: true, state: {} })
            }
        }
        logoutNotification();
    }, [location.state]); // Run this effect only when location.state changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            // Perform login logic here
            const response = await api.post('/auth/login', {
                username,
                password
            });

            // Handle success response
            if (response.status === 200) {
                toast.success("User logged in successfully", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                }); // Show toast message

                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    navigate('/home'); 
                }, 1500);
            } else {
                toast.error("Error logging in", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                });
            }
        } catch (err) {
            // Handle error response
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message, {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                });
            } else {
                toast.error("An error occurred. Please try again later.", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                })
            }
            // Log the error for debugging
            console.error(err);
            toast.error("Error logging in", {
                duration: 3000, // Duration in milliseconds
                position: 'top-center', // Position of the toast
            })
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Please enter your username and password to log in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='grid gap-2'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                id='username'
                                type='text'
                                placeholder='Enter your username'
                                className='border border-gray-300 rounded px-4 py-2 mb-4 w-full'
                                required
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Enter your password'
                                className='border border-gray-300 rounded px-4 py-2 mb-4 w-full'
                                required
                            />
                        </div>
                        <div>
                            <Button type='submit' className='w-full'>
                                Login
                            </Button>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className='flex-col'>
                    <div>
                        <p className='mt-4'>Don't have an account?
                            <a href="/register">
                                <Button variant={"link"}>
                                    Register
                                </Button>
                            </a>
                        </p>
                    </div>
                </CardFooter>
            </Card>

            {/* Toast Component */}
            <Toaster />
        </div>
    )
}