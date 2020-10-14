import { DataNode, Almacen, NodoTree } from './../../interface/nodoTree';
import { Request, Response } from "express";
import db from "../../database";
import ProveedoresModelo from "../../interface/proveedores";


export const allproveedores = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_proveedores";
    const proveedores: ProveedoresModelo[] = await db.querySelect(consulta);
    return resp.status(201).json(proveedores);
}

export const insertarProveedor = async (req: Request, resp: Response) => {
    let consulta = "INSERT INTO compras_proveedores SET ?";
    const proveedor = req.body;
    const result = await db.querySelect(consulta, [proveedor]);
    resp.status(201).json(result);
}

const resultLimpio = (arbol: NodoTree[]) => {
    return arbol.map((dato) => {
        !dato.children && delete (dato.children);
        dato.children && resultLimpio(dato.children);
        return dato
    });
}


const childNodos = (nodo: Almacen, todos: Almacen[]) => {
    const hijos = todos.filter((dato) => dato.idPadre == nodo.idAlmacenes);

    let newNodo: NodoTree = {};
    let nodos: NodoTree[] = [];

    if (hijos.length == 0) {
        return null;
    }

    hijos.forEach((hijo) => {
        newNodo.data = hijo;
        newNodo.children = <NodoTree[]>childNodos(hijo, todos);
        nodos.push(newNodo);
        newNodo = {};
    });

    return nodos;
}

export const todosAlmacenesArbol = async (req: Request, resp: Response) => {

    await db.conectarBD();
    let consulta = "SELECT * FROM almacenes ORDER BY idPadre, idAlmacenes";
    const todosBD: Almacen[] = await db.querySelect(consulta);
    await db.desconectarDB();

    const padres: Almacen[] = todosBD.filter((nodo) => nodo.idPadre == 0);
    const ramasYhojas: Almacen[] = todosBD.filter((nodo) => nodo.idPadre != 0);



    let resultado: DataNode = { "data": [] };
    let newNodoTree: NodoTree = {};

    padres.forEach((raiz) => {
        newNodoTree.data = raiz;
        newNodoTree.children = (<NodoTree[]>childNodos(raiz, ramasYhojas));
        // newNodoTree.children?.push(<NodoTree>childNodos(raiz, ramasYhojas));
        resultado.data?.push(newNodoTree);
        newNodoTree = {};

    })

    return resp.status(201).json({ data: resultLimpio(<NodoTree[]>resultado.data) });
    //return resp.status(201).json(resultado);

}