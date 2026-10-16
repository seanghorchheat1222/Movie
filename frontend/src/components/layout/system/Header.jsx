import preProfile from '../../../assets/images/pre-poster.png'
import NotificationIcon from '../../ui/NotificationIcon'
import SettingIcon from '../../ui/SettingIcon'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import Nav from './Nav';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user)

  const toSetting = () => {
    navigate('/admin/setting')
  }

  const toggleSideBarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }


  return (
    <>
      <div className='border-b fixed top-0 left-0 w-full pl-2 md:pl-22 lg:pl-57 px-2 py-2 flex items-center justify-between bg-[#020202] border-[rgba(255,255,255,0.50)]'>
        <div className='hidden md:block'>
          {location.pathname === '/admin' ? 'Dashboard' :
            location.pathname === '/admin/movies' ? 'Movie' :
              location.pathname === '/admin/categories' ? 'Category' :
                location.pathname === '/admin/generals' ? 'General' :
                  location.pathname === '/admin/actors' ? 'Actor' :
                    location.pathname === '/admin/users' ? 'User' : 'Setting'
          }
        </div>
 
        <div className='flex flex-col gap-1 cursor-pointer md:hidden' onClick={() => toggleSideBarOpen()}>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
        </div>

        <div className='flex gap-2 items-center'>
          <button className='w-max h-max rounded-full cursor-pointer relative'>
            <div className='border rounded-full w-8 h-8 flex justify-center items-center'>
              <div className='w-4 h-4 shrink-0'>
                <NotificationIcon className={'fill-[#FFFFFF]'}></NotificationIcon>
              </div>
            </div>
            <div className='w-3 h-3 rounded-full bg-[#814BA6] absolute -top-1 right-0'>
              
            </div>
          </button>

          <button className='w-max h-max rounded-full cursor-pointer' onClick={() => toSetting()}>
            <div className='border rounded-full w-8 h-8 flex justify-center items-center'>
              <div className='w-4 h-4 shrink-0'>
                <SettingIcon className={'fill-[#FFFFFF]'}></SettingIcon>
              </div>
            </div>
          </button>

          <div className='flex gap-1 items-center ml-2'>
            <div className='w-13 h-13 rounded-full'>
              <img src={preProfile} alt="" className='w-full h-full object-cover rounded-full' />
            </div>
            <div className='hidden md:block'>
              <div>{user.name}</div>
              <div className='text-[12px]'>{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    
         <div className={`border-r border-r-[rgba(255,255,255,0.50)] h-full fixed top-0  w-55 md:w-20 lg:w-55 px-2 bg-[#020202] ${isSidebarOpen ? 'left-0' : '-left-100'} trainsition duration-300 ease-in-out`}>
           <div className='flex flex-col gap-1 cursor-pointer mt-6' onClick={() => toggleSideBarOpen()}>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
          <span className='inline-block w-7 h-1 bg-[rgba(255,255,255,100)] rounded-full'></span>
        </div>
        <div>
         <Nav></Nav>
        </div>
      </div>

    </>
  )
}

export default Header