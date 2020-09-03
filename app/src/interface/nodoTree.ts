export interface Almacen {
    idAlmacenes?: number;
    nombre?: string;
    codigo?: string;
    descripcion?: string;
    idPadre ? : number
}

export interface NodoTree {
    data?: Almacen;
    children?: NodoTree[]
}

export interface DataNode {
    data?: NodoTree[]
}