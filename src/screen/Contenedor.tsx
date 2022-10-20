import { useContext } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AutContext } from '../context/AuthContext';

import { Employees } from './Employees';
import { Login } from './Login';
import { Upload } from './Upload';

export const Contenedor = () => {
    const { isLoading } = useContext(AutContext);
    

    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path='/' element={ <Login /> }  />
                    
                    <Route path={'/employed/:nombreEmployed'} element={ !isLoading ? <Employees /> : <Navigate to='/' /> }  />
                    <Route path={'/upload'} element= { !isLoading ? <Upload /> : <Navigate to='/' /> } />
                    
                </Routes>
            </HashRouter>

        </div>
            
    )
}
