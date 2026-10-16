import React from 'react'
import logo from '../../../assets/images/logo.png'
import smallLogo from '../../../assets/svgs/logo.svg'
import Nav from './Nav'


function Sidebar() {
  return (
    <>
      <div className={`border-r border-[rgba(255,255,255,0.50)] h-full fixed top-0 left-0 w-55 md:w-20 lg:w-55 px-2 bg-[#020202] hidden md:block`}>
        <div className='flex justify-center lg:justify-start'>
          <div className='w-13 lg:w-30 shrink-0 mt-3'>
            <img src={logo} alt="" className='w-full h-full hidden lg:block' />
            <img src={smallLogo} alt="" className='w-full h-full block lg:hidden' />
          </div>
        </div>
        <div>
          <Nav></Nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar