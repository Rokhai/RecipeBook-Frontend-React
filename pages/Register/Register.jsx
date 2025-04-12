import React from 'react'

function Register() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-14'>Register</h1>
            <form className='flex flex-col w-96 border-gray-500 border-1 rounded-lg p-6'>
                <div className='mb-4'>
                    <label htmlFor="username" className='block mb-2'>Username</label>
                    <input type="text" id="username" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2'>Password</label>
                    <input type="password" id="password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
                </div>  
                <div>
                    <label htmlFor="confirm-password" className='block mb-2'>Confirm Password</label>
                    <input type="password" id="confirm-password" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' required />
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