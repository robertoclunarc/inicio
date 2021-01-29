
import { Request, Response } from "express";
import db from "../../database";
import solpedDetalleModelo from "../../interface/solpeddetalle";

export const solpedetalledata = async (req: Request, resp: Response) => {
    const idSolped = req.params.idSolped;
    let consulta = `SELECT det.*, 
                    (SELECT nombre FROM adm_areas_trabajo areaT WHERE det.idAreaTrabajo = areaT.idAreaTrabajo) AS nombre_trabajo,
                    (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = det.nroActivo) AS nombre_activo,
                    (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = det.idProveedor) AS nombre_proveedor
                    FROM compras_detalle_solped det WHERE det.idSolpedCompras = ?`;
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
                            precio_neto = ?
                    WHERE idSolpedCompras = ?`;
    const result = await db.querySelect(consulta, [detalle.cant_encontrada, detalle.precio,
    detalle.idProveedor, detalle.notas, detalle.idSolpedCompras, detalle.tasa_iva, detalle.precio_iva])
    resp.status(201).json(result);
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
