import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/');
  }
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center gap-2'>
        <div>
          404, Page Not Found!
        </div>
        <button className='flex items-center gap-2 bg-[#FFFFFF] rounded-md px-5 cursor-pointer py-1' onClick={() => toHome()}>
          <div className='text-[#814BA6]'>
            Go Back
          </div>
        </button>
      </div>
    </>
  )
}

export default NotFound