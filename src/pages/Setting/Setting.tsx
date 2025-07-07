import React, { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout';
import api from '../../util/api'
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z, { TypeOf } from 'zod';

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


import { LoaderCircle, Save } from 'lucide-react';


const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password do not match",
  path: ["confirmPassword"], // <-- This attaches the error to the confirmPassword field
});

export default function Setting() {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });


  // Handle form submission
  const handleChangePassword = async (values: z.infer<typeof changePasswordSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.patch('/users/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      if (response.status === 200) {
        // Password changed successfully
        toast.success("Password changed successfully");
        form.reset();
        setTimeout(() => {
          navigate('/home'); // Redirect to home after successful password change
        }, 2000); // Optional delay before redirecting
      } else {
        // Handle error response
        toast.error("Error changing password");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              Please enter your details to change your password.
            </CardDescription>
          </CardHeader>
          <CardContent>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleChangePassword)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='currentPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder='Enter your current password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder='Enter your new password'
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
                    <Save className='mr-2' />
                  )}
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className='w-full flex'>
              <Button variant={"outline"} className='w-full' onClick={() => window.location.href = '/home'}>
                Back to Home
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Toast Component */}
        <Toaster position='top-right' duration={2000} closeButton/>
      </div>

    </MainLayout>
  )
}

