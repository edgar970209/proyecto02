import React, { useContext } from 'react'
import { Route, useNavigate, RouteProps } from 'react-router-dom';
import { AutContext } from '../context/AuthContext';


export const PrivateRouter = (props: any)  => {

  const { isLoading } = useContext(AutContext);

  const navigate = useNavigate();


  if (isLoading) {
    return navigate('/');
  }

  return <Route {...props} />
}
