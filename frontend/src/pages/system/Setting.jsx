import React from 'react'
import preProfile from '../../assets/images/pre-poster.png'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../services/system/setting'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../../store/userSlice'

function Setting() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = async() => {
    const response = await signOut(user.token)
    if(response.status == 204){
      navigate('/');
      dispatch(clearUser())
    } 
  }

  return (
    <>
      <div className=' mt-2 p-3 rounded-md'>
        <div className='flex justify-center flex-col items-center gap-2'>
          <div className='w-45 h-45 rounded-full'>
            <img src={preProfile} alt="" className='w-full h-full rounded-full' />
          </div>
          <div className='text-2xl font-semibold'>
            Seanghor
          </div>
        </div>

        <div className='grid gap-5 mt-4'>
          <div className='flex gap-2 mt-2 flex-col'>
            <label htmlFor="">Name</label>
            <input type="text" className='border rounded-xl h-10 w-full pl-2 border-[rgba(255,255,255,0.50)]' name='title' readOnly value={user.name} />
          </div>
        </div>

        <div className='grid gap-5 mt-2'>
          <div className='flex gap-2 mt-2 flex-col'>
            <label htmlFor="">Email</label>
            <input type="text" className='border rounded-xl h-10 w-full pl-2 border-[rgba(255,255,255,0.50)]' name='title' value={user.email} />
          </div>
        </div>

        <div className='grid gap-5 mt-2'>
          <div className='flex gap-2 mt-2 flex-col'>
            <label htmlFor="">Role</label>
            <input type="text" className='border rounded-xl h-10 w-full pl-2 border-[rgba(255,255,255,0.50)]' name='title' value={user.role} />
          </div>
        </div>

        <div className='grid gap-5 mt-2'>
          <div className='flex gap-2 mt-2 flex-col'>
            <label htmlFor="">Join</label>
            <input type="text" className='border rounded-xl h-10 w-full pl-2 border-[rgba(255,255,255,0.50)]' name='title' value={'2019-11-04'} readOnly />
          </div>
        </div>

        <div className='flex justify-end items-center flex-col-reverse md:flex-row gap-3 mt-4'>
          <div className='flex justify-end w-full'>
            <button className='bg-[#814BA6] rounded-md w-max px-10 py-2 cursor-pointer' onClick={() => handleSignOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Setting