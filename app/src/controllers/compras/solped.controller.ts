import { Request, Response } from "express";
import db from "../../database";
import solpedModelo from "../../interface/solped";

import solpeddetalleModelo from "../../interface/solpeddetalle";


export const solpedAll = async (req: Request, resp: Response) => {
    const solpeds = await db.querySelect(`SELECT  sol.*,
                                                (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                                (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado,
                                                (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = sol.idEmpresa) 
                                                AS nombre_empresa_facturar
                                        FROM compras_solped sol
                                            WHERE (idEstadoActual >= 4 AND idEstadoActual <= 12)`); //OR (idEstadoActual = 14)
    resp.status(201).json(solpeds);
}

export const solpedAllOc = async (req: Request, resp: Response) => {
    const solpeds = await db.querySelect(`SELECT  sol.*,
                                         (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                         (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                            WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado,
                                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = sol.idEmpresa) 
                                            AS nombre_empresa_facturar
                                        FROM compras_solped sol
                                         WHERE idEstadoActual = 13`);
    resp.status(201).json(solpeds);
}


export const misSolped = async (req: Request, resp: Response) => {
    const usuario = req.params.idSegUsuario;
    const solpeds = await db.querySelect(`SELECT  sol.*,
                                         (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                         (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                            WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado,
                                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = sol.idEmpresa) 
                                            AS nombre_empresa_facturar
                                        FROM compras_solped sol
                                         WHERE ((idEstadoActual >= 4 AND idEstadoActual < 9) OR idEstadoActual = 11 ) AND sol.idSegUsuario = ?`, [usuario]);
    resp.status(201).json(solpeds);
}

export const solpedNew = async (req: Request, resp: Response) => {
    const newSolped: solpedModelo = req.body;
    try {
        const result = await db.querySelect("INSERT INTO compras_solped SET ? ", [newSolped]);
        resp.status(201).json(result);
    } catch (err) {
        resp.status(401).json({ err: err });
    }
    //resp.json(solpeds); 

}

export const solpedOne = async (req: Request, resp: Response) => {
    const id = req.params.idSolped;
    const solpeds = await db.querySelect(`SELECT sol.*,
                                        (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                        (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                        WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado,
                                        (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = sol.idEmpresa) 
                                        AS nombre_empresa_facturar
                                        FROM compras_solped sol WHERE idSolpedCompras = ? `, [id]);
    resp.status(201).json(solpeds[0]);
}


export const solpedDetalleOne = async (req: Request, resp: Response) => {
    const id = req.params.idSolped;
    const solpeds = await db.querySelect(`SELECT * FROM compras_detalle_solped sol WHERE idSolpedCompras = ? `, [id]);
    resp.status(201).json(solpeds);
}


export const updateSolped = async (req: Request, resp: Response) => {
    const id = req.params.idSolped;
    const updateSolped: solpedModelo = req.body;
    try {
        const result = await db.querySelect("UPDATE compras_solped SET ? WHERE idSolpedCompras = ? ", [updateSolped, id]);
        resp.status(201).json(result);
    } catch (err) {
        resp.status(401).json({ err: err });
    }
}

export const solpedMasterDetalle = async (req: Request, resp: Response) => {
    let consulta1 = "SELECT * "
        + " FROM compras_solped"
        + " WHERE idEstadoActual >= 4";
    let arbol: any[] = [];
    const solpeds: solpedModelo[] = await db.querySelect(consulta1);
    //let detalles: solpeddetalleModelo[] = [];

    Promise.all(
        solpeds.map((sol) => {
            let consulta2 = "SELECT * FROM compras_detalle_solped WHERE idSolpedCompras = " + sol.idSolpedCompras;
            //const detalles: solpeddetalleModelo[] = await db.querySelect(consulta2);

            return db.querySelect(consulta2)
                .then((detalle: solpeddetalleModelo[]) => {
                    let nododet: any = {};
                    detalle.forEach((det) => {
                        nododet = { ...det };
                        //nododet = Object.assign([{...det}, {children: []}]);
                    });
                    arbol.push({ data: sol, children: [{ data: nododet, children: [] }] });
                });
        }))
        .then((result) => {
            //console.log(arbol);
            resp.json(arbol);
        });
}

export const solpedAsignacion = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;
    const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET idEstadoActual = ?, estadoActual = ?, idSegUsuario = ? WHERE idSolpedCompras = ? ";
    const solpeds = await db.querySelect(consulta,
        [solped.idEstadoActual, solped.estadoActual, solped.idSegUsuario, idSolped]);
    return resp.status(201).json(solpeds);
}

export const solpedCambioFase = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET idEstadoActual = ?, estadoActual = ? WHERE idSolpedCompras = ? ";
    try {
        const solpeds = await db.querySelect(consulta,
            [solped.idEstadoActual, solped.estadoActual, solped.idSolpedCompras]);
        return resp.status(201).json(solpeds);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }


}

export const aprobacionSolPed = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET fecha_aprobo_presi = ? WHERE idSolpedCompras = ? ";
    try {
        const solpeds = await db.querySelect(consulta,
            [solped.idEstadoActual, solped.estadoActual, solped.idSolpedCompras]);
        return resp.status(201).json(solpeds);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const solpedEmpresaAAfacturar = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;

    let consulta = "UPDATE compras_solped SET idEmpresa = ? WHERE idSolpedCompras = ? ";
    const solpeds = await db.querySelect(consulta,
        [solped.idEmpresa, solped.idSolpedCompras]);
    return resp.status(201).json(solpeds);
}

//POSIBLE DESARROLLO 
/* export const cambioPorRevisionPresi = async (req: Request, resp: Response) => {
    const solped : solpedModelo = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET idEstadoActual = ?, estadoActual = ?, just WHERE idSolpedCompras = ? "; 
    const solpeds = await db.querySelect(consulta,
        [solped.idEstadoActual, solped.estadoActual, solped.idSolpedCompras]);
    return resp.status(201).json(solpeds);
} */

export const updateMontoTotal = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET monto_total = ?, monto_total_usd = ?, tasa_usd = ?, fecha_tasa_usd = ? WHERE idSolpedCompras = ? ";
    try {
        const solpeds = await db.querySelect(consulta,
            [solped.monto_total, solped.monto_total_usd, solped.tasa_usd, solped.fecha_tasa_usd, solped.idSolpedCompras]);
        return resp.status(201).json(solpeds);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const solpedPresidencia = async (req: Request, resp: Response) => {
    const solped: solpedModelo = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "SELECT * FROM compras_solped WHERE idEstadoActual = 12";
    const solpeds = await db.querySelect(consulta);
    return resp.status(201).json(solpeds);
}