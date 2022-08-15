import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

    function ProtectedRoutes() {
    let granted_access = sessionStorage.getItem("access_granted") === "true";
    return (
    granted_access ? <Outlet/> : <Navigate to="/"/>   
  )
}

export default ProtectedRoutes