import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ Component }) => {
  const { isAuthenticated } = useSelector(state=> state.user);
  return(
    isAuthenticated ? <Component /> : <Navigate to={'/login'} />
  )
}

export default ProtectRoute