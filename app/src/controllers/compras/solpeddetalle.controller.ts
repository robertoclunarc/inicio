
import { Request, Response } from "express";
import db from "../../database";
import solpedDetalleModelo from "../../interface/solpeddetalle";

export const solpedetalledata = async (req: Request, resp: Response) => {
    const idSolped = req.params.idSolped;
    let consulta = `SELECT det.*, 
                    (SELECT nombre FROM adm_areas_trabajo areaT WHERE det.idAreaTrabajo = areaT.idAreaTrabajo) AS nombre_trabajo,
                    (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = det.nroActivo) AS nombre_activo,
                    (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = det.idProveedor) AS nombre_proveedor
                    FROM compras_detalle_solped det WHERE det.idSolpedCompras = ?
                    AND det.estado = 0
                    ORDER BY det.idProveedor, det.codigo, det.nroActivo`; 
    const detalles: solpedDetalleModelo[] = await db.querySelect(consulta, [idSolped]);
    resp.status(201).json(detalles);
}

export const cambioEstado = async (req: Request, resp: Response) => {
    const detalle: solpedDetalleModelo = req.body;

    let consulta = `UPDATE compras_detalle_solped SET 
                            cant_encontrada = ?, 
                            precio = ?, 
                            idProveedor = ?, 
                            notas = ?,
                            tasa_iva = ?,
                            precio_neto = ?,
                            estado = ?
                    WHERE idSolpedCompras = ? and codigo = ?`;
    const result = await db.querySelect(consulta, [detalle.cant_encontrada, detalle.precio,
    detalle.idProveedor, detalle.notas, detalle.tasa_iva, detalle.precio_iva, detalle.estado, detalle.idSolpedCompras, detalle.codigo]);
    resp.status(201).json(result);
}

export const getTotalDetallesNoProcess = async (req: Request, resp: Response) => {
    const idSolped: string = req.params.idSolped;

    let consulta = `SELECT 
                        COUNT(det.idDetalleSolped) as cant_noprocess 
                    FROM compras_detalle_solped det
                    WHERE idSolpedCompras = ? AND det.estado = 0`;
    const result = await db.querySelect(consulta, [idSolped]);
    resp.status(201).json(result[0]);
}


export const delDetallesSolped = async (req: Request, resp: Response) => {
    const idSolped = req.params.idSolped;
    let consulta = `DELETE FROM compras_detalle_solped 
                        WHERE idSolpedCompras = ?`;
    const result = await db.querySelect(consulta, [idSolped]);
    resp.status(201).json(result);
}

export const insertDetalleSolped = async (req: Request, resp: Response) => {
    const detalleSolped: solpedDetalleModelo = req.body;
    let consulta = "INSERT INTO compras_detalle_solped SET ?";
    try {
        const result = await db.querySelect(consulta, [detalleSolped]);
        resp.status(201).json(result);
    } catch (err) {
        console.log(err);
        resp.status(400).json({ err: err }); 
    }
}




export const updateGenerado = async(req: Request, resp: Response) => {
    const detSolped : solpedDetalleModelo = req.body;
    let consulta = "UPDATE compras_detalle_solped SET generado = 1 WHERE idDetalleSolped = ?";
    try {
        const result = await db.querySelect(consulta, [detSolped.idDetalleSolped]);
        resp.status(200).json(result);
    } catch (error) {
        console.log(error);
        resp.status(400).json({error});
    }
}
