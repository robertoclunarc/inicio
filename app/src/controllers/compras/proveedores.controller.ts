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

const buildTree = (nodo: NodoTree): NodoTree | undefined => {

    if (!nodo.children) {
        return nodo;
    }
    nodo.children?.push(<NodoTree>buildTree(nodo));

}

/* var _makeTree = function (options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.idAlmacenes || "idAlmacenes";
    pid = options.idPadre || "idPadre";
    children = options.children || "children";
    temp = {};
    temp.data = {};
    o = [];
    _ref = options.data;

    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        //e.data = _ref[_i];
        //
        e = {};
        e.data = _ref[_i];

        //e[children] = [];
        temp.data[e.data[id]] = e.data;
        //console.log("identifica: ", temp);
        console.log("temp", _ref[_i]);
        if (temp.data[e.data[pid]] != null) {
            e.children = [];
            console.log("inden: ", e.data[pid]);
            //temp.children = [];

            //console.log("temp", temp);

            //temp[e.data[pid]].children = [];
            //temp.data[e.data[pid]][children].push(e);
        } else {
            o.push(e);
        }
    }
    return o;
};


var _makeTreeO = function (options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.idAlmacenes || "idAlmacenes";
    pid = options.idPadre || "idPadre";
    children = options.children || "children";
    temp = {};
    o = [];
    _ref = options.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        //e[children] = [];
        temp[e[id]] = e;
        if (temp[e[pid]] != null) {
            temp[e[pid]][children] = [];
            temp[e[pid]][children].push(e);
        } else {
            o.push(e);
        }
    }
    return o;
}; */


const hijosNodos = async (dato: Almacen): Promise<undefined | NodoTree[]> => {

    let consulta = "SELECT * FROM almacenes WHERE idPadre = ?";
    const hijos: Almacen[] = await db.querySelect(consulta, [dato.idAlmacenes]);

    /*    let hijos: Almacen[] = [
           { "idAlmacenes": 11, "nombre": "mtto", "descripcion": "mtto", "idPadre": 1 },
           { "idAlmacenes": 21, "nombre": "Proyecto", "descripcion": "proyecto", "idPadre": 2 }
       ]; */

    let nodo: NodoTree = {};
    let nodos: NodoTree[] = [];

    if (hijos.length == 0) {
        nodo.data = { ...dato };
        return [nodo];
    }

    hijos.forEach(async (datos) => {
        nodo.data = datos;
        nodos.push(nodo);
        //nodo.children?.push(<NodoTree>buildTree(nodo));
        nodo.children?.push(<NodoTree>hijosNodos(datos));
        nodo = {}
    });

    //awiat 
    return nodos;

};



const hijoslimpios = (nodo: NodoTree) => {

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

/* let padresNodos: NodoTree[] = [];
  padres.forEach((padre) => {
      padresNodos.push({ data: padre })
  }); */
//(<NodoTree[]>todosBD.filter((nodo)=>nodo.idPadre == 0)).map((node)=>{data:node.data}); //


export const todosAlmacenesArbol = async (req: Request, resp: Response) => {

    let consulta = "SELECT * FROM almacenes ORDER BY idPadre, idAlmacenes";
    const todosBD: Almacen[] = await db.querySelect(consulta);

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

    //copiando


}