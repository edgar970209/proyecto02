import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CajaTexto } from '../components/CajaTexto';
import { AutContext } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
   
    const { logeado, usuario, pass } = useContext(AutContext);
    const [alerta, setAlerta] = useState<JSX.Element>(<></>);
    const [ocultar, setOcultar] = useState('block');
    const inputUsuario = useRef();
    const inputPass = useRef();

    const { 
        datoUsuario,
        datoPass,
        getUsuario,
        getPassword
    } = useLogin(inputUsuario, inputPass);

    const navigate = useNavigate();

    const login = (inputUser: any, inputPassw: any) =>{
        if (usuario === inputUser.current.value 
            && pass === inputPassw.current.value) {
                logeado();
                navigate(`/employed/${usuario}`);
        }else{
            setAlerta(
                <>
                    <div className="alert alert-danger" role="alert">
                        Error! Usuario incorrecto
                    </div>
                </>
            )
            setInterval(function(){
                setOcultar('none')
            }, 3000);
        }
    }

    return (
        <>
            <div style={{ display: ocultar }}>
                { alerta}
            </div>
            <div className=''>Login</div>
            <CajaTexto 
                tituloTexto='Usuario'
                idTexto='inputUsuario'
                classNameLabel='col-sm-2 col-form-label text-white bg-dark'
                classNameTexto='form-control'
                refe={inputUsuario}
                type='text'
                onChange={ () => getUsuario() }
            />
            <CajaTexto 
                tituloTexto='Password'
                idTexto='inputPassword'
                classNameTexto='form-control'
                classNameLabel='col-sm-2 col-form-label text-white bg-dark'
                refe={inputPass}
                type='password'
                onChange={ () => getPassword() }
            />

            <div className='mb-3'>
                <button 
                    className='btn btn-success'
                    onClick={() => login(inputUsuario, inputPass)} 
                    disabled={ datoUsuario && datoPass ? false : true }
                > Ingresar </button>
            </div>

        </>
    )
}
