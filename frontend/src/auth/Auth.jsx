import React, { useEffect, useState } from 'react'
import SystemLayout from '../components/layout/system/SystemLayout'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Auth() {
  const user = useSelector((state) => state.user);

  return (
    <>
    {
      user?.token && user.role === 'admin' ?
        <SystemLayout></SystemLayout>
        :
        <Navigate to='/'></Navigate>
    }
    </>
  )
}

export default Auth