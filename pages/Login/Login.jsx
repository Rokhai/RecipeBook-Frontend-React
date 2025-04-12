import React from 'react'

function Login() {
    return (

        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-4'>Login</h1>
            <form className='flex flex-col w-96 border-gray-500 border-1 rounded-lg p-6'>
                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username:</label>
                    <input type="username" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password:</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>    

                <button type="submit" className='bg-black text-white font-bold px-6 py-3'>Login</button>
            </form>
        </div>
    )
}

export default Login