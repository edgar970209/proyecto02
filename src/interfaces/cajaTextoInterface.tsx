export interface PropsCajaTexto{
    tituloTexto?: string;
    idTexto?: string;
    classNameTexto: string;
    classNameLabel?: string;
    placeHolder?: string;
    refe: any;
    type: string;
    onChange: () => void;
    required?: true | false
    value?: string
    maxLength?: number
}
