import { useState, useEffect } from 'react';

interface Props{
    imageSelectedPrevious: string[];
}

export const VisualizarImagen = (props: Props) => {

    const { imageSelectedPrevious } = props;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(imageSelectedPrevious[0]);

    const selectNewImage = (index: number, images: string[], next = true) => {

        // setTimeout(() => {
          const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
          const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
          setSelectedImage(images[nextIndex]);
          setSelectedIndex(nextIndex);
        // }, 500);
    };

    useEffect(() => {
        setSelectedImage(imageSelectedPrevious[0]);
    }, [imageSelectedPrevious])

    const previous = () => {
        selectNewImage(selectedIndex, imageSelectedPrevious, false);
      };
    
    const next = () => {
        selectNewImage(selectedIndex, imageSelectedPrevious);
    };
    
    return (
      <div>
        {selectedImage && <img src={selectedImage} alt='img' style={{
            maxWidth: 500,
            width: '100%',
            height: 'auto'
        }} />}

        <div style={{
            display: 'flex',
            alignContent: 'center',
            flexDirection: 'row',
            marginTop: 15,
        }}>
            <button onClick={previous}
                style={{
                    color: 'white',
                    padding: 8,
                    margin: '0 5px'
                }}
                className='btn btn-outline-info'
            >{'<'}</button>
            <button onClick={next}
                style={{
                    color: 'white',
                    padding: 8,
                    margin: '0 5px'
                }}
                className='btn btn-outline-info'
            >{'>'}</button>
        </div>
      </div>
    );
}
