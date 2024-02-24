import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const isloggedin = localStorage.getItem('token');
  
  if (isloggedin) {
      return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
