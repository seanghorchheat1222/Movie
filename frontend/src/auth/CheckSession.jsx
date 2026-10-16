import React, { Children, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/api'
import { clearUser } from '../store/userSlice'

function CheckSession({children}) {
  const disPatch = useDispatch()
  
  useEffect(() => {
    checkSession()
  }, [disPatch])

  const checkSession = async () => {
    try{
      await api.get('current-user')
    }catch(err){
      if(err.response?.status === 401 || err.response?.status === 403){
        disPatch(clearUser())
      }else{
        console.error('Session check failed:', err);
      }
    }
  } 

  return children
}

export default CheckSession