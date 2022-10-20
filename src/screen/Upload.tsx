
import { useState } from 'react';
import { VisualizarImagen } from '../components/VisualizarImagen';

import '../helpers/css/Upload.css';

export const Upload = () => {

    const [imageSelectedPrevious, setImageSelectedPrevious] = useState<string[]>([]);
    const [imageSelectedEnviar, setImageSelectedEnviar] = useState<string[]>([]);
    const [mostrarImagenes, setMostrarImagenes] = useState<boolean>(false);

    const changeImage = (event: any) => {
        
        if (event.target.files.length > 0) {

          for (let index = 0; index < event.target.files.length; index++) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[index]);

            reader.onload = (events: any) => {
                events.preventDefault();
                setImageSelectedPrevious(prevImage => [...prevImage, events.currentTarget.result]);
                setImageSelectedEnviar(prevImage => [...prevImage, events.currentTarget.result])
            }
            
          }
        }
    };

    

    const uploadImage = () =>{
        
        imageSelectedPrevious.map((value, index) => {
            sessionStorage.setItem(`${index}`, value);
        })
        
        setImageSelectedPrevious([]);
        
    }

    
    return (
        <div className="container">
            <div style={{ backgroundColor: 'white', marginTop: 30 }} className='image-upload-wrap'>
                <input 
                    className='file-upload-input' 
                    type="file" 
                    style={{ left: '-1px'}}
                    accept="image/*" 
                    multiple
                    onChange={(event) => {
                        changeImage(event);
                    }}
                />
                <div className="text-information">
                    <h3>Arrastre y suelte una imagen o seleccione Agregar imagen</h3>
                </div>
            </div>
            <div style={{ display: imageSelectedPrevious.length > 0 ? 'block' : 'none' }}>

                <div className="center">
                    {
                        imageSelectedPrevious.map((value: any, index) => (
                            <img
                                key={index}
                                src={value}
                                alt=""
                                height="150px"
                                width="250px"
                            />
                        ))
                    }

                </div>
                <button 
                    className='btn btn-outline-primary' 
                    style={{ marginTop: 20 }}
                    onClick={ () => uploadImage()}
                >Cargar Imagen</button>
            </div>
            <div style={{ display: imageSelectedEnviar.length > 0 ? 'block' : 'none', marginTop: 20 }}>
                <button 
                    className='btn btn-outline-success' 
                    style={{ marginTop: 20 }}
                    onClick={ () => setMostrarImagenes(true)}
                >Visualizar Imagenes</button>

                <div style={{ display: mostrarImagenes ? 'block' : 'none', marginTop: 20 }}>
                    <VisualizarImagen imageSelectedPrevious={imageSelectedEnviar} />
                </div>

            </div>
        </div>
    )
}
