import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { AutContext } from '../context/AuthContext';

import '../helpers/css/Modal.css';

ReactModal.setAppElement("#root"); 
interface EmpleadosRecibido{
    nombre: string;
    apellidos: string;
    nacimiento: string;
  }

interface Props{
    body: JSX.Element;
    empleadosEnviar: EmpleadosRecibido;
    setEmpleadosEnviar: React.Dispatch<React.SetStateAction<EmpleadosRecibido>>;
}

export const Modal = (props: Props ) => {

    const { body, empleadosEnviar, setEmpleadosEnviar } = props;
    const { nombre, apellidos, nacimiento} = empleadosEnviar;

    const [isOpen, setIsOpen] = useState(false);
    const { postEmpleados } = useContext(AutContext);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const enviarEmpleado = () =>{
        postEmpleados({nombre, apellido: apellidos, fecNacimiento: nacimiento});

        setEmpleadosEnviar({
            nombre: '',
            apellidos: '',
            nacimiento: ''
        });
    }

    return (
        <div>
            <button 
                className='btn btn-outline-danger col-sm-8' 
                onClick={() => toggleModal()}
                data-bs-toggle="modal"
                data-bs-target="#modal1"
              >Agregar Usuario</button>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => toggleModal()}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
                //onAfterOpen = {}
                style={customStyles}
            >
                <div>Agregar Empleados</div>
                
                { body }
                <button onClick={toggleModal} style={{ marginTop: 10}} className="btn btn-warning">Close modal</button>
                &nbsp;
                &nbsp;
                <button 
                    onClick={() => enviarEmpleado()} 
                    style={{ marginTop: 10}} 
                    className="btn btn-success"
                    disabled={(nombre && apellidos && nacimiento) ? false : true}
                >Agregar</button>
            </ReactModal>
        </div>
    )
}


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};