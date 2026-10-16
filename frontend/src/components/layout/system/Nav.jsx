import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import DashboardIcon from '../../ui/DashboardIcon';
import MovieIcon from '../../ui/MovieIcon';
import CategoryIcon from '../../ui/CategoryIcon';
import ProfileIcon from '../../ui/ProfileIcon';
import SettingIcon from '../../ui/SettingIcon';

function Nav() {
  const location = useLocation();
  return (
    <>
      <nav className='mt-5'>
        <ul>
          <li className='mt-2'>
            <NavLink to='/admin' className={`flex gap-1 justify-start md:justify-center lg:justify-start px-2 py-2 rounded-md ${location.pathname === '/admin' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <DashboardIcon className={`fill-[#FFFFFF]`}></DashboardIcon>
              </div>
              <div className='block md:hidden lg:block'>
                Dashboard
              </div>
            </NavLink>
          </li>

          <li className='mt-2'>
            <NavLink to='/admin/movies' className={`flex gap-1 justify-start md:justify-center lg:justify-start px-2 py-2 rounded-md ${location.pathname === '/admin/movies' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <MovieIcon className={`fill-[#FFFFFF]`}></MovieIcon>
              </div>
              <div className='block md:hidden lg:block'>
                Movie
              </div>
            </NavLink>
          </li>

          <li className='mt-2'>
            <NavLink to='/admin/categories' className={`flex gap-1  justify-start md:justify-center lg:justify-start px-2 py-2 rounded-md ${location.pathname === '/admin/categories' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <CategoryIcon className={`fill-[#FFFFFF]`}></CategoryIcon>
              </div>
              <div className='block md:hidden lg:block'>
                Category
              </div>
            </NavLink>
          </li>

          <li className='mt-2'>
            <NavLink to='/admin/generals' className={`flex gap-1 justify-start md:justify-center lg:justify-start  px-2 py-2 rounded-md ${location.pathname === '/admin/generals' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <CategoryIcon className={`fill-[#FFFFFF]`}></CategoryIcon>
              </div>
              <div className='block md:hidden lg:block'>
                General
              </div>
            </NavLink>
          </li>

          <li className='mt-2'>
            <NavLink to='/admin/actors' className={`flex gap-1 justify-start md:justify-center lg:justify-start px-2 py-2 rounded-md ${location.pathname === '/admin/actors' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <ProfileIcon className={`fill-[#FFFFFF]`}></ProfileIcon>
              </div>
              <div className='block md:hidden lg:block'>
                Actor
              </div>
            </NavLink>
          </li>

          <li className='mt-2'>
            <NavLink to='/admin/users' className={`flex gap-1 justify-start md:justify-center lg:justify-start px-2 py-2 rounded-md ${location.pathname === '/admin/users' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <ProfileIcon className={`fill-[#FFFFFF]`}></ProfileIcon>
              </div>
              <div className='block md:hidden lg:block'>
                User
              </div>
            </NavLink>
          </li>


          <li className='mt-2'>
            <NavLink to='/admin/setting' className={`flex gap-1 justify-start md:justify-center lg:justify-start  px-2 py-2 rounded-md ${location.pathname === '/admin/setting' ? 'bg-[#814BA6]' : 'bg-transparent hover:bg-[rgba(255,255,255,0.20)]'}`}>
              <div className='w-6 h-6 shrink-0'>
                <SettingIcon className={`fill-[#FFFFFF]`}></SettingIcon>
              </div>
              <div className='block md:hidden lg:block'>
                Setting
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav