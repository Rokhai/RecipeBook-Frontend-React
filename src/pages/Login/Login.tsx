import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { LoaderCircle, LogIn } from 'lucide-react';

import api from '../../util/api';

const loginFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(3, "Password is at least 8 characters long"),
});

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });


    useEffect(() => {
        const logoutNotification = () => {
            
            // Check if the user was logged out successfully
            if (location.state?.loggedOut) { // location.state && location.state.loggedOut
                // setToastMessage("Logged out successfully");
                toast.success("Logged out successfully", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                });
    
                // Clear the loggedOut state after showing the message
                navigate(location.pathname, { replace: true, state: {} })
            }
        }
        logoutNotification();
    }, [location.state]); // Run this effect only when location.state changes

    // Handle form submission
    const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        setIsLoading(true);
        try {
            // Perform login logic here
            const response = await api.post('/auth/login', {
                username: values.username,
                password: values.password
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
        } finally {
            setIsLoading(false);
        }

    }

    // Render the login form
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

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='username' 
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Enter your username'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='password'
                                                placeholder='Enter your password'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoaderCircle className='animate-spin' />
                                ) : (
                                    <LogIn className='mr-2' />
                                )}      
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex-col'>
                    <div>
                        <p className='mt-4'>
                            Don't have an account?
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