import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextComponent';
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem('isLoggedIn');
  const location = useLocation();
  const isAuthRoute = location.pathname === '/auth/signin' || location.pathname === '/auth/signup';

  console.log(loggedIn);
  if (isAuthRoute) return;
  if (loggedIn) return children;

}


export default ProtectedRoute;