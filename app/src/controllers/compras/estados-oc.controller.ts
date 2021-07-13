import { Request, Response } from "express";
import db from "../../database";
import EstadosOc from "../../interface/estados-oc";

export const estadosModCompras = async (req: Request, resp: Response) => {
    const idEstadoActual = req.params.idEstado;
    try {
        let consulta = `SELECT estados.* 
                        FROM compras_oc_estados as estados
                        WHERE estados.id BETWEEN 2 AND 5
                        ORDER BY estados.orden ASC`;
        const estados: EstadosOc[] = await db.querySelect(consulta); 
        resp.status(201).json(estados);
        
    } catch (error) {
        console.log(error);
        resp.status(401).json(error);
    }
}

// export const inserttrazasolped = async (req: Request, resp: Response) => {
//     const itraza: solpedtrazaModelo = req.body;
//     let consulta = "INSERT INTO compras_traza_solped SET ?";
//     try {
//         const result = await db.querySelect(consulta, [itraza]);
//         resp.status(201).json(result);
//     } catch (error) {
//         console.log(error);
//         resp.json({ "Error": error });
//     }
// }

// export const inserttrazaOC = async (req: Request, resp: Response) => {
//     const itraza: TrazaOc = req.body;
//     let consulta = "INSERT INTO compras_trazas_oc SET ?";
//     try {
//         const result = await db.querySelect(consulta, [itraza]);
//         resp.status(201).json(result);
//     } catch (error) {
//         console.log(error);
//         resp.json({ "Error": error });
//     }
// }