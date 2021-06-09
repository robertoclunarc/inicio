import { Request, Response } from "express";
import db from "../../database";
import detalleModelo from "../../interface/detalleoc";

export const detalleOcAll = async (req: Request, resp: Response) => {
    const idOc = req.params.idComprasOC;
    let consulta = `SELECT  detoc.*
                     FROM compras_oc_detalle detoc WHERE detoc.idComprasOC = ?`;
    const detalles: detalleModelo[] = await db.querySelect(consulta, [idOc]);
    //return detalles;
    resp.json(detalles);
}

export const insertdetalleOC = async (req: Request, resp: Response) => {
    const newDetalle: detalleModelo = req.body;
    let consulta = "INSERT INTO compras_oc_detalle SET ?";
    try {
        const result = await db.querySelect(consulta, [newDetalle]);
        resp.status(201).json(result);        
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const updatePorCambioTasa = async (req: Request, resp: Response) => {
    const updateDet: detalleModelo = req.body;
    const id = req.params.idDetalleOC;
    let consulta = "UPDATE compras_oc_detalle SET precio = ?, subtotal = ? WHERE idOcDetalle = ? ";
    try {
        const result = await db.querySelect(consulta,
            [updateDet.precio, updateDet.subtotal, id]);
        resp.status(201).json(result);        
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}


