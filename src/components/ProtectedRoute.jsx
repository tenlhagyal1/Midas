import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn');

  console.log(loggedIn);
  
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/auth/signin" replace />;
  }
}


export default ProtectedRoute;