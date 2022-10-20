import { useState, useEffect, useContext } from 'react';
import { Employee, Employeed } from '../interfaces/employedInterface';
import employedDB from '../api/employedDB';
import { AutContext } from '../context/AuthContext';

export const useEmployed = () =>{

    const [tablaEmpleados, setTablaEmpeados] = useState<Employee[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { agregarEmpleados } = useContext(AutContext);

    const getEmpleados = async () =>{
       const response = await employedDB.get<Employeed>(`/:${'edgar'}`);

       setEmpleados(response.data.data.employees);
       setTablaEmpeados(response.data.data.employees);
       setIsLoading(false);
    }

    const handleChange = (valor: any) => {
        filtrar(valor.current.value);
    }


    const filtrar = (dato: string) => {
        const resultadoBusqueda = tablaEmpleados?.filter((elemento) =>{
            if (elemento.name.toString().toLowerCase().includes(dato.toLowerCase()) 
                || elemento.last_name.toString().toLowerCase().includes(dato.toLowerCase())) {
                    return elemento;
            }
        });

        setEmpleados(resultadoBusqueda);
    }

    useEffect(() => {
        getEmpleados();
    }, [])

    useEffect(() => {
        getEmpleados();
    }, [agregarEmpleados]);


    
    
    return {
        empleados,
        isLoading,
        handleChange
    }

}