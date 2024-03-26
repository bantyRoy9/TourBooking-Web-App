import React,{Suspense} from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../layout/error/ErrorBoundary';

const ProtectRoute = ({ Component , isProtected,...props}) => {
  return(
    isProtected ? <ErrorBoundary><Suspense fallback={<Loader/>}><Component {...props}/></Suspense></ErrorBoundary> : <Navigate to={'/login'} />
  )
}

export default ProtectRoute