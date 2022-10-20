import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CajaTexto } from '../components/CajaTexto';
import { Modal } from '../components/Modal';
import { Spinner } from '../components/Spinner';
import { useEmployed } from '../hooks/useEmployed';
import { Employee } from '../interfaces/employedInterface';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css'
import { AutContext } from '../context/AuthContext';

interface EmpleadosEnviar{
  nombre: string;
  apellidos: string;
  nacimiento: string;
}

export const Employees = () => {

  const inputBusqueda = useRef();
  const navigate = useNavigate();
  const { empleados, isLoading, handleChange } = useEmployed();
  const [currentPage, setCurrentPage] = useState(0);
  const [empleadosEnviar, setEmpleadosEnviar] = useState<EmpleadosEnviar>({
    nombre: '',
    apellidos: '',
    nacimiento: ''
  });

  const filtrarEmpleados = (): Employee[] => {
    
    return empleados.slice(currentPage, currentPage + 10);

  }

  const nextPage = () =>{
      
      if (empleados.length > currentPage + 10 ) {
        setCurrentPage(currentPage + 10);
      }
  }

  const previusPage = () =>{
      if (currentPage > 0) {
        setCurrentPage(currentPage - 10);
      }
  }
  
  
  return (
    <>
      <div className='text-white bg-dark'>Empleados</div>
      {
        isLoading
          ? <div style={{ marginTop: 40, marginLeft: '-12%'}}>
            <Spinner />
          </div>
          :
          <>
            <div className='containerInput col-sm-8' style={{ marginTop: 40, marginLeft: '-12%'}}>
              <CajaTexto
                placeHolder='Búsqueda por Nombre o Apellido' 
                idTexto='inputBusqueda'
                classNameLabel='col-sm-2 col-form-label text-white bg-dark'
                classNameTexto='form-control inputBuscar'
                refe={inputBusqueda}
                type='text'
                onChange={ () => handleChange(inputBusqueda) }
              />
              <Modal 
                body={ <CuerpoModal setEmpleadosEnviar={setEmpleadosEnviar} empleadosEnviar={empleadosEnviar}/>}
                empleadosEnviar={ empleadosEnviar }
                setEmpleadosEnviar={ setEmpleadosEnviar }
              />
              
            </div>
            <div style={{ float: 'right', marginTop: '-13%'}}>
              <button className='btn btn-outline-info col-md' onClick={() => navigate('/upload')}>Upload</button>
            </div>
            <div className='table-responsive' >
                <table className='table align-middle table-dark'>
                  <thead>
                    <tr>
                      <th style={{ width: 300}}>Nombre</th>
                      <th style={{ width: 300}}>Apellidos</th>
                      <th style={{ width: 300}}>Fecha Nacimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filtrarEmpleados().map((value) => (
                        <tr key={value.id}>
                          <td>{ value.last_name }</td>
                          <td>{ value.name }</td>
                          <td>{ value.birthday }</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div>
                <button className='btn btn-primary' onClick={() => previusPage()}>Anteriores</button>
                &nbsp;
                &nbsp;
                <button className='btn btn-primary' onClick={() => nextPage()}>Siguientes</button>
              </div>
          </> 
      }
    </>
  )
}

interface PropsCuerpoModal{
  setEmpleadosEnviar: React.Dispatch<React.SetStateAction<EmpleadosEnviar>>;
  empleadosEnviar: EmpleadosEnviar
}

const CuerpoModal = (props: PropsCuerpoModal) =>{

  const { setEmpleadosEnviar, empleadosEnviar } = props;
  const [selected, setSelected] = useState<Date>();
  const { agregarEmpleados } = useContext(AutContext);

  const inputNombre = useRef();
  const inputApellidos = useRef();

  const getNombre = (nombre: any) => {
    setEmpleadosEnviar({
      ...empleadosEnviar,
      nombre: nombre.current.value,
    })
  }

  const getApellidos = (apellidos: any) => {
    setEmpleadosEnviar({
      ...empleadosEnviar,
      apellidos: apellidos.current.value,
    })
  };

  const getNacimiento = (fecha: Date) => {
    setSelected(fecha);
    
    const fechaFormato = moment(fecha).format('YYYY/MM/DD');
    setEmpleadosEnviar({
      ...empleadosEnviar,
      nacimiento: fechaFormato,
    })

  }

  
  useEffect(() => {
    setSelected(new Date());
  }, [agregarEmpleados])
  
  

  return(
    <div className=''>
      <div style={{ marginTop: 20 }}>
        <CajaTexto 
            tituloTexto='Nombre'
            idTexto='inputNombre'
            classNameLabel='col-sm-2 col-form-label text-white bg-dark'
            classNameTexto='form-control'
            refe={inputNombre}
            type='text'
            onChange={ () => getNombre(inputNombre) }
            required = {true}
            value={empleadosEnviar.nombre}
            maxLength={30}
        />
        <CajaTexto 
            tituloTexto='Apellidos'
            idTexto='inputApellidos'
            classNameLabel='col-sm-2 col-form-label text-white bg-dark'
            classNameTexto='form-control'
            refe={inputApellidos}
            type='text'
            onChange={ () => getApellidos(inputApellidos) }
            required = {true}
            value={empleadosEnviar.apellidos}
            maxLength={30}
        />
        <div className="mb-3 row">
          <label htmlFor='inputDate'  className='col-sm-2 col-form-label text-white bg-dark' >Fecha de nacimiento</label>
          <div className='col-sm-10' style={{ marginTop: '2%'}}>
            <DatePicker
              selected={selected}
              onChange={(date: Date) => getNacimiento(date)}
              dateFormat="yyyy/MM/dd"
              className='form-control'
            />
          </div>
        </div>
      </div>
    </div>
  )
}