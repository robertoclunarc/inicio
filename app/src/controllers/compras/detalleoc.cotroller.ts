import {Request, Response }from "express";
import db from "../../database";
import detalleModelo from "../../interface/detalleoc";

export const detalleOcAll = async (req : Request, resp : Response)  => {
    const idOc = req.params.idComprasOC;
    let consulta = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
    const detalles : detalleModelo[] = await db.querySelect(consulta, [idOc]); 
    //return detalles;
    resp.json(detalles);
}

export const insertdetalleOC = async (req: Request, resp : Response) => {
    const newDetalle : detalleModelo = req.body;
    let consulta = "INSERT INTO compras_oc_detalle SET ?";
    const result = await db.querySelect(consulta, [newDetalle]);
    resp.status(201).json(result); 
}

