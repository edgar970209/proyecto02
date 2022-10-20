import React, { useState, useRef } from 'react'


export const useLogin = (
    inputUsuario?: any,
    inputPass?: any
) => {
    const [datoUsuario, setDatoUsuario] = useState<string>();
    const [datoPass, setDatoPass] = useState<string>();
    
    const getUsuario = () =>{
        setDatoUsuario(inputUsuario.current.value); 
    }

    const getPassword = () =>{
        setDatoPass(inputPass.current.value);
        
    }

    
    return{
        datoUsuario,
        datoPass,
        getUsuario,
        getPassword
    }
}
