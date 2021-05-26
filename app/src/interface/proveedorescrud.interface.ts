export interface IProveedores {
    idProveedor?: number; 
    nombre: string; 
    rif: string; 
    direccion: string; 
    valoracion: number; 
    observaciones?: string; 
    telefono?: string; 
    contacto: string;
    formas_envio?: string;
    condiciones?: string;
    estatus? : number; 
}
