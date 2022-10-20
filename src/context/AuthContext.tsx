import { createContext, useEffect, useState } from "react";
import employedDB from "../api/employedDB";


interface UserProps{
    usuario: string;
    pass: string;
    isLoading: boolean;
    logeado: () => void;
    postEmpleados: ({ nombre, apellido, fecNacimiento }: PropsEmpleado) => Promise<void>
    agregarEmpleados: boolean
}

interface Usuarios{
    usuario: string;
    pass: string;
    isLoading: boolean,
}

interface PropsEmpleado{
    nombre: string;
    apellido: string;
    fecNacimiento: string;
}


export const AutContext = createContext({} as UserProps);


export const AutProvider = ({ children }: any) => {

    const [usuarios, setUsuarios] = useState<Usuarios>({
        usuario: 'admin',
        pass: '12345',
        isLoading: true
    });
    const [agregarEmpleados, setAgregarEmpleados] = useState(false);


    const logeado = () => {
        setUsuarios({
            usuario: 'admin',
            pass: '12345',
            isLoading: false,
        });
    }

    const postEmpleados = async ({
        nombre,
        apellido,
        fecNacimiento
    }: PropsEmpleado) => {
        console.log(nombre, apellido, fecNacimiento);
        
        const response = await employedDB.post(`/:${'edgar'}`, {
            "name": apellido,
            "last_name": nombre,
            "birthday": fecNacimiento
        });
        console.log(response);
        if (response.status) {
            setAgregarEmpleados(true);
        }else{
            setAgregarEmpleados(false);
        }
        
    }

    return(
        <AutContext.Provider value={{ ...usuarios, logeado, postEmpleados, agregarEmpleados }}>
            { children }
        </AutContext.Provider>
    )
    
}