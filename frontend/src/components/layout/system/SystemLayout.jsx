import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function SystemLayout() {
  return (
    <>
      <Header></Header>
      <main className='pl-1 md:pl-11 lg:pl-28.5 pt-10 pr-1'>
        <Outlet></Outlet>
      </main>
      <Sidebar></Sidebar>
    </>
  )
}

export default SystemLayout