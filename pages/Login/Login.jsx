import React from 'react'

function Login() {
    return (

        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-14'>Login</h1>
            <form className='flex flex-col w-96 border-gray-500 border-1 rounded-lg p-6'>
                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <input type="username" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                    <div>
                        <input type="checkbox" id="remember" className='mr-2' />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>    

                <button type="submit" className='bg-black text-white font-bold px-6 py-3 mt-12 mb-2'>Login</button>
                
                <div>
                    <p className='text-center mt-4'>Don't have an account? <a href="/register" className='text-blue-500'>Register</a></p>
                 
                </div>
            </form>
        </div>
    )
}

export default Login