import React from 'react'
import axios from 'axios'
// import { redirect } from 'react-router';
import { useNavigate, redirect } from 'react-router';

function Login() {

    const navigate = useNavigate();

    const toHome = () => { 
        navigate('/home');
    }

    const handleSubmit = async (e) => {
        const username = e.target.username.value;
        const password = e.target.password.value;
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                username,
                password
            })
            // Handle success response
            if (response.status === 200) {
                alert("User logged in successfully");
                // Redirect to home page or perform any other action
                // window.location.href = '/home';
                // return redirect('/home');
                // redirect('/home');
                navigate('/home');
            } else {
                alert("Error logging in");
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
            alert("Error logging in");
        }
    }


    return (

        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-14'>Login</h1>
            <form onSubmit={toHome} className='flex flex-col w-96 border-gray-500 border-1 rounded-lg p-6'>
                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <input type="username" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' value={"Rokhai"} required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' value={"123"} required />
                    <div>
                        <input type="checkbox" id="remember" className='mr-2' />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>
                <a href="/home" className='w-full'>
                    <button type="submit" className='bg-black text-white font-bold px-6 py-3 mt-12 mb-2'>Login</button>
                </a>
                <div>
                    <p className='text-center mt-4'>Don't have an account? <a href="/register" className='text-blue-500'>Register</a></p>

                </div>
            </form>
        </div>
    )
}

export default Login