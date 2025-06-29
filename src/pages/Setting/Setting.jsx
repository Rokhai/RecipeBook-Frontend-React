import React, {useState} from 'react'
import Toast from '@/components/Toast';
import MainLayout from '@/components/Layout/MainLayout';
import api from '../../util/api'


function Setting() {
  const [toastMessage, setToastMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value.trim();
    const newPassword = e.target.newPassword.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (newPassword !== confirmPassword) {
      // alert("New password and confirm password do not match");
      setToastMessage("New password and confirm password do not match");
      return;
    }

    try {
      const response = await api.patch('/users/change-password', {
        currentPassword,
        newPassword
      });

      if (response.status === 200) {
        // setHasNewPassword(true);
        setToastMessage("Password changed successfully");
        e.target.currentPassword.value = "";
        e.target.newPassword.value = "";
        e.target.confirmPassword.value = "";

      } else {
        // Handle error response
        // console.error("Error changing password");
        setToastMessage("Error changing password");
      }
    } catch (err) {
      setToastMessage("An error occurred. Please try again later.");
      // console.error("An error occurred. Please try again later.");
    }
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-4 mx-10 mt-5">Change password</h1>
      <div className="mx-15 w-1/3">
        <h2 className="text-2xl  mb-4"></h2>
        <form action="" onSubmit={handleSubmit} > 
          <div className='mb-4'>
            <label htmlFor="currentPassword" className='block mb-2'>Current password</label>
            <input type="password" id="currentPassword" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' placeholder='Type your current password' required /> {/**value={"rok"}  */}
          </div>
          <div>
            <label htmlFor="newPassword" className='block mb-2'>New password</label>
            <input type="password" id="newPassword" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' placeholder='Type your new password' required /> {/**value={"123"}  */}
          </div>
          <div>
            <label htmlFor="confirmPassword" className='block mb-2'>Confirm Password</label>
            <input type="password" id="confirmPassword" className='border border-gray-300 rounded px-4 py-2 mb-4 w-full' placeholder='Retype your new password' required />
          </div>
          <button type="submit" className='bg-gray-900 text-white font-bold px-6 py-3 mt-12 mb-2 cursor-pointer hover:bg-gray-800'>Change password</button>
        </form>
      </div>

      <Toast 
        message={toastMessage}
        onClose={() => setToastMessage("")}
        duration={3000}
        position='bottom-right'
      />
    </MainLayout>
  )
}

export default Setting