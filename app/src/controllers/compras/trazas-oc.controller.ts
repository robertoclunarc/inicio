import { TrazaOc } from "../../interface/octraza";
import { Request, Response } from "express";
import db from "../../database";


export const inserttrazaOC = async (req: Request, resp: Response) => {
    const itraza: TrazaOc = req.body;
    let consulta = "INSERT INTO compras_trazas_oc SET ?";
    try {
        const result = await db.querySelect(consulta, [itraza]);
        resp.status(201).json(result);
    } catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
}

export const allTrazasPorOC = async (req: Request, resp: Response) => {
    let idComprasOC = req.params.idComprasOC;
    let consulta = "SELECT * from compras_trazas_oc WHERE idComprasOC = ?";
    try {
        const result = await db.querySelect(consulta, [idComprasOC]);
        resp.status(201).json(result);
    } catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
} 