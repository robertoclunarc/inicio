import {Request, Response} from "express";
import db from "../../database";
import solpedtrazaModelo from "../../interface/solpedtraza";

export const trazassolped = async (req : Request, resp: Response) => {
    const idsolped = req.params.idSolped;
    let consulta = "SELECT * FROM compras_traza_solped WHERE idSolpedCompras = ?";
    const trazas : solpedtrazaModelo[] = await db.querySelect(consulta, [idsolped]);
    resp.status(201).json(trazas);
}

export const inserttrazasolped = async (req: Request, resp: Response) => {
    const itraza: solpedtrazaModelo = req.body;
    let consulta = "INSERT INTO compras_traza_solped SET ?";
    try {
        const result = await db.querySelect(consulta, [itraza]);
        resp.status(201).json(result);
    } catch (error) {
        console.log(error);
        resp.json({"Error" : error}); 
    }
    
    
}