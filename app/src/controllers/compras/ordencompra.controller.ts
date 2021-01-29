import { Request, Response } from "express";
import db from "../../database";
import ocModelo from "../../interface/ordencompra";

export const todasOC = async (req: Request, resp: Response) => {
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor
                     FROM compras_oc oc ORDER BY oc.idComprasOC DESC`;
    const ordenes: ocModelo[] = await db.querySelect(consulta);
    resp.status(200).json(ordenes);
}


export const detalleOneOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    let consulta = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
    const ordenes: ocModelo[] = await db.querySelect(consulta, [id]);
   // console.log(ordenes);
    resp.status(200).json(ordenes);
}

export const getOneOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT c.primerNombre + ' ' + c.primerApellido FROM seg_usuarios c WHERE c.idSegUsuario = oc.idUsuarioAprobo) AS nombre_aprobo,
                    FROM compras_oc as oc WHERE idComprasOC = ?`;
    const ordenes: ocModelo[] = await db.querySelect(consulta, [id]);
    resp.status(200).json(ordenes[0]);
}

export const todasMasterDetalle = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_oc";
    let arbol: any[] = [];
    const ordenes: ocModelo[] = await db.querySelect(consulta);

    let result = ordenes.map( async (oc: ocModelo) => {
        let consulta2 = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
        const detallesOC = await db.querySelect(consulta2, [oc.idComprasOC]);
        //console.log(detallesOC);
        
        return arbol.push({ data: oc, children: detallesOC });
    });
    
    await Promise.all(result)
    resp.status(200).json(arbol);
 
}

export const insertOC = async (req: Request, resp: Response) => {
    const newOC: ocModelo = req.body;
    let consulta = "INSERT INTO compras_oc SET ?"
    const result = await db.querySelect(consulta, [newOC]);
    resp.status(200).json(result);
}

export const updateOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    const updateSolped: ocModelo = req.body;
    const result = await db.querySelect("UPDATE compras_oc SET ? WHERE idComprasOC = ? ", [updateSolped, id]);
    resp.json(result);
}