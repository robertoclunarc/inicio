import {Request, Response} from "express";
import  db  from "../../database";
import ProveedoresModelo from "../../interface/proveedores";

export const allproveedores = async (req : Request, resp : Response) => {
    let consulta = "SELECT * FROM compras_proveedores";
    const proveedores: ProveedoresModelo[] = await db.querySelect(consulta);
    return resp.status(201).json(proveedores);    
}

export const insertarProveedor = async (req : Request, resp : Response) => {
    let consulta = "INSERT INTO compras_proveedores SET ?";
    const proveedor = req.body;
    const result = await db.querySelect(consulta, [proveedor]);
    resp.status(201).json(result);
}