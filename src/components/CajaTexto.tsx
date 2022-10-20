import React, { useState } from 'react'
import { PropsCajaTexto } from '../interfaces/cajaTextoInterface'
import { useLogin } from '../hooks/useLogin';


export const CajaTexto = (props: PropsCajaTexto) => {

    const { 
        tituloTexto,
        idTexto,
        classNameTexto,
        placeHolder,
        refe,
        type,
        classNameLabel,
        onChange,
        required = false,
        value,
        maxLength
    } = props;

    
        

    return (
        <div className="mb-3 row">
            <label htmlFor={idTexto}  className={classNameLabel} >{tituloTexto}</label>
            <div className="col-sm-10" >
                <input 
                    type={type} 
                    className={classNameTexto} 
                    id={idTexto} 
                    ref={refe} 
                    onChange={() => onChange()}
                    placeholder={placeHolder}
                    required={ required }
                    value={value}
                    maxLength={maxLength}
                    //onCopy={"return false;"}
                />
            </div>
        </div>
    )
}
