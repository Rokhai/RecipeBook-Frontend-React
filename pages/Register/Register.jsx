import React from 'react'
import axios from 'axios'
import { redirect } from 'react-router';




function Register() {



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        console.log(e.target.username.value);
        console.log(e.target.password.value);
        console.log(e.target.confirmPassword.value);

        const name = e.target.name.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            // Send a POST request to the backend API
            const response = await axios.post('http://localhost:3000/users',{
                name,
                username,
                password
            })

            // Handle success response
            if (response.status === 201) {
                alert("User registered successfully");
                // Redirect to login page or perform any other action
                // window.location.href = '/login';
                redirect('/home');
            } else {
                alert("Error registering user");
            }
        } catch (err) {
            // Handle error response
            if (err.response && err.response.status === 400) {
                alert(err.response.data.message);
            } else {
                alert("An error occurred. Please try again later.");
            }
            // Log the error for debugging
            console.error(err);
            alert("Error registering user");
        }
    }

    return (
    <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-14'>Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-96 border-gray-500 border-1 rounded-lg p-6'>
                <div>
                    <label htmlFor="name" className='block mb-2'>Name</label>
                    <input type="text" id="name" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>

                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <input type="text" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>  
                <div>
                    <label htmlFor="confirmPassword" className='block mb-2'>Confirm Password</label>
                    <input type="password" id="confirmPassword" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>  
                

                <button type="submit" className='bg-black text-white font-bold px-6 py-3 mt-12 mb-2'>Register</button>

                <div>
                    <p className='text-center mt-4'>Already have an account? <a href="/login" className='text-blue-500'>Login</a></p>
                </div>
            </form>
        </div>
  )
}

export default Register