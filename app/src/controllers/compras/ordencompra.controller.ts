import { Request, Response } from "express";
import db from "../../database";
import ocModelo from "../../interface/ordencompra";

export const todasOC = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_oc";
    const ordenes: ocModelo[] = await db.querySelect(consulta);
    resp.status(200).json(ordenes);
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