import  { useState } from 'react'
import api from '../../util/api';
import { useNavigate } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

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

import { LoaderCircle, Send } from 'lucide-react';

const registerFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // <-- This attaches the error to the confirmPassword field
});

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    // Handle form submission
    const handleSubmit = async (values: z.infer<typeof registerFormSchema>) => {
        setIsLoading(true);
        try {
            const response = await api.post('/users', {
                name: values.name,
                username: values.username,
                password: values.password,
            });

            if (response.status === 201) {
                toast.success("Registration successful! You can now log in.", {
                    duration: 3000, // Duration in milliseconds
                    position: 'top-center', // Position of the toast
                });
                // Redirect to login page after successful registration
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Optional delay before redirecting
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.", {
                duration: 3000, // Duration in milliseconds
                position: 'top-center', // Position of the toast
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Please enter your details to create an account.
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Enter your name'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='password'
                                                placeholder='Confirm your password'
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
                                    <Send className='mr-2' />
                                )}
                                Register
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex-col'>
                    <div>
                        <p className='mt-4'>
                            Already have an account?
                            <a href="/login">
                                <Button variant={"link"}>
                                    Login
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
