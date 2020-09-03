import { DataNode, Almacen } from './../../interface/nodoTree';
import { Request, Response } from "express";
import db from "../../database";
import ProveedoresModelo from "../../interface/proveedores";
import { NodoTree } from "../../interface/nodoTree";

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

var _makeTree = function (options) {
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


var _makeTreeO = function(options) {
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
  };


const hijosNodos = async (dato: Almacen): Promise<undefined | NodoTree | NodoTree[]> => {

    let consulta = "SELECT * FROM almacenes WHERE idPadre = ?";
    const datosbd: Almacen[] = await db.querySelect(consulta, [dato.idAlmacenes]);

    /*    let datosbd: Almacen[] = [
           { "idAlmacenes": 11, "nombre": "mtto", "descripcion": "mtto", "idPadre": 1 },
           { "idAlmacenes": 21, "nombre": "Proyecto", "descripcion": "proyecto", "idPadre": 2 }
       ]; */

    let nodo: NodoTree = {};
    let nodos: NodoTree[] = [];

    if (datosbd.length == 0) {
        nodo.data = dato;
        return nodo;
    }


    datosbd.forEach((datos) => {
        nodo.data = datos;
        //nodo.children?.push(<NodoTree>buildTree(nodo));
        nodo.children?.push(<NodoTree>hijosNodos(datos));
        nodos.push(nodo);
        //console.log("nodo", nodo);

        nodo = {}
    })

    return nodos;

};

/* function promiseForEach(arr, cb) {
    var i = 0;

    var nextPromise = function () {
        if (i >= arr.length) {
            // Processing finished.
            return;
        }

        // Process next function. Wrap in `Promise.resolve` in case
        // the function does not return a promise
        var newPromise = Promise.resolve(cb(arr[i], i));
        i++;
        // Chain to finish processing.
        return newPromise.then(nextPromise);
    };

    // Kick off the chain.
    return Promise.resolve().then(nextPromise);
}; */

export const todosAlmacenesArbol = async (req: Request, resp: Response) => {



    let consulta = "SELECT * FROM almacenes ORDER BY idPadre, idAlmacenes";
    const padresDB: Almacen[] = await db.querySelect(consulta);
    let newNodo: NodoTree = {};
    let dataInicial: DataNode = { "data": [] };

    //console.log(padresDB);
    //console.log(_makeTree({ data: padresDB }));  
    //let result = _makeTree({ data: padresDB });
    return resp.status(201).json({ "data": _makeTreeO({ data: padresDB }) });
    //return resp.status(201).json({ "data": [] });


}