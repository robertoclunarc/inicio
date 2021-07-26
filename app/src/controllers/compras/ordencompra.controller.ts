import { Request, response, Response } from "express";
import db from "../../database";
import detalleOcModelo from "../../interface/detalleoc";
import EstadosOc from "../../interface/estados-oc";
import OrdenCompraModelo from "../../interface/ordencompra";
import ocModelo from "../../interface/ordencompra";
// import { join } from "path";


export const todasOC = async (req: Request, resp: Response) => {
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = oc.idComprasEmpresa) 
                            AS nombre_empresa_facturar,
                            (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = oc.idSegUsuario) nombre_asignado,
                            (SELECT descripcion FROM gen_centro_costos u
                                                    WHERE u.idGenCentroCostos = oc.idGenCentroCostos) nombre_cc
                     FROM compras_oc oc ORDER BY oc.idComprasOC DESC`;
    try {
        const ordenes: ocModelo[] = await db.querySelect(consulta);
        resp.status(200).json(ordenes);

    } catch (error) {
        console.error(error);
        return resp.status(400).json(error);
    }

}

export const todasOcActivas = async (req: Request, resp: Response) => {
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = oc.idComprasEmpresa) 
                            AS nombre_empresa_facturar,
                            (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = oc.idSegUsuario) nombre_asignado,
                            (SELECT descripcion FROM gen_centro_costos u
                                                        WHERE u.idGenCentroCostos = oc.idGenCentroCostos) nombre_cc
                     FROM compras_oc oc 
                     WHERE oc.idEstado NOT IN (1, 2, 4, 8)
                     ORDER BY oc.idComprasOC DESC`;
    try {
        const ordenes: ocModelo[] = await db.querySelect(consulta);
        resp.status(200).json(ordenes);
    } catch (error) {
        console.error(error);
        return resp.status(400).json(error);
    }

}


export const ocHistoricos = async (req: Request, resp: Response) => {
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = oc.idComprasEmpresa) 
                            AS nombre_empresa_facturar,
                            (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = oc.idSegUsuario) nombre_asignado,
                            (SELECT descripcion FROM gen_centro_costos u
                                                        WHERE u.idGenCentroCostos = oc.idGenCentroCostos) nombre_cc
                     FROM compras_oc oc 
                     WHERE oc.idEstado IN (4, 8)
                     ORDER BY oc.idComprasOC DESC`;
    try {
        const ordenes: ocModelo[] = await db.querySelect(consulta);
        resp.status(200).json(ordenes);
    } catch (error) {
        console.error(error);
        return resp.status(400).json(error);
    }

}

export const todasOcHistoricas = async (req: Request, resp: Response) => {
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = oc.idComprasEmpresa) 
                            AS nombre_empresa_facturar,
                            (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = oc.idSegUsuario) nombre_asignado,
                            (SELECT descripcion FROM gen_centro_costos u
                                                        WHERE u.idGenCentroCostos = oc.idGenCentroCostos) nombre_cc
                     FROM compras_oc oc 
                     WHERE oc.idEstado IN (4, 7, 8)
                     ORDER BY oc.idComprasOC DESC`;
    try {
        const ordenes: ocModelo[] = await db.querySelect(consulta);
        resp.status(200).json(ordenes);
    } catch (error) {
        console.error(error);
        return resp.status(400).json(error);
    }

}

export const detalleOneOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    let consulta = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
    const ordenes: detalleOcModelo[] = await db.querySelect(consulta, [id]);
    // console.log(ordenes);
    resp.status(200).json(ordenes);
}

export const getOneOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    let consulta = `SELECT  oc.*,
                            (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = oc.idAdmActivo) AS nombre_activo,
                            (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = oc.idProveedor) AS nombre_proveedor,
                            (SELECT CONCAT(CONCAT(c.primerNombre, ' '), c.primerApellido) FROM seg_usuarios c WHERE c.idSegUsuario = oc.idUsuarioAprobo) AS nombre_aprobo,
                            (SELECT nombre_empresa FROM compras_empresa em WHERE em.idComprasEmpresa = oc.idComprasEmpresa) AS nombre_empresa_facturar, 
                            (SELECT nombre FROM config_gerencias WHERE idConfigGerencia = oc.idConfigGerencia) AS nombre_gerencia,
                            (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                                    WHERE u.idSegUsuario = oc.idSegUsuario) nombre_asignado,
                            (SELECT descripcion FROM gen_centro_costos u
                                                        WHERE u.idGenCentroCostos = oc.idGenCentroCostos) nombre_cc
                    FROM compras_oc as oc WHERE idComprasOC = ?`;
    try {
        const ordenes: ocModelo[] = await db.querySelect(consulta, [id]);
        resp.status(200).json(ordenes[0]);
    } catch (error) {
        console.error(error);
        return resp.status(400).json(error);
    }
}

export const todasMasterDetalle = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_oc";
    let arbol: any[] = [];
    const ordenes: ocModelo[] = await db.querySelect(consulta);

    let result = ordenes.map(async (oc: ocModelo) => {
        let consulta2 = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
        const detallesOC = await db.querySelect(consulta2, [oc.idComprasOC]);
        return arbol.push({ data: oc, children: detallesOC });
    });

    await Promise.all(result)
    resp.status(200).json(arbol);

}


export const obtenerEstadoActSig = async (req: Request, res: Response) => {
    const idComprasOC: number = +req.params.idComprasOC;

    // Anulado
    let consulta = "SELECT * FROM compras_oc_estados WHERE nombre like '%ANULAD%' ";
    const estadoAnulado: EstadosOc = (await db.querySelect(consulta))[0];

    //Actual de la OC
    consulta = "SELECT * FROM compras_oc WHERE idComprasOC = ? ";
    const dataOC: OrdenCompraModelo = (await db.querySelect(consulta, [idComprasOC]))[0];
    consulta = "SELECT * FROM compras_oc_estados WHERE id = ?";
    const estadoActual: EstadosOc = (await db.querySelect(consulta, [dataOC.idEstado]))[0] || null;

    //estado Siguiente
    consulta = `SELECT * FROM compras_oc_estados WHERE orden > 0 AND orden = ?
                ORDER BY orden`;
    let newOrden: number = (!estadoActual.orden ? 0 : estadoActual.orden + 1);
    const estadoSiguiente: OrdenCompraModelo = (await db.querySelect(consulta, [newOrden]))[0];

    return res.status(200).json([estadoActual, estadoSiguiente, estadoAnulado]);
}

export const insertOC = async (req: Request, resp: Response) => {
    const newOC: ocModelo = req.body;
    let consulta = "INSERT INTO compras_oc SET ?"
    try {
        const result = await db.querySelect(consulta, [newOC]);
        resp.status(200).json(result);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const updateOC = async (req: Request, resp: Response) => {
    const id = req.params.idComprasOC;
    const updateSolped: ocModelo = req.body;
    try {
        const result = await db.querySelect("UPDATE compras_oc SET ? WHERE idComprasOC = ? ", [updateSolped, id]);
        resp.json(result);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const updateMontoTotalOrdenCompra = async (req: Request, resp: Response) => {
    const ocUpdate: ocModelo = req.body;
    const id = req.params.idComprasOC;
    let consulta = "UPDATE compras_oc SET monto_total = ?, monto_total_usd = ?, tasa_usd = ?, fecha_tasa_usd = ? WHERE idComprasOC = ? ";
    try {
        const result = await db.querySelect(consulta,
            [ocUpdate.monto_total, ocUpdate.monto_total_usd, ocUpdate.tasa_usd, ocUpdate.fecha_tasa_usd, ocUpdate.idComprasOC]);
        resp.status(201).json(result);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}

export const updateCorrelativo = async (req: Request, resp: Response) => {
    const ocUpdate: ocModelo = req.body;
    const id = req.params.idComprasOC;
    let consulta = "UPDATE compras_oc SET correlativo = ? WHERE idComprasOC = ? ";
    try {
        const result = await db.querySelect(consulta,
            [ocUpdate.correlativo, id]);
        resp.status(201).json(result);
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error);
    }
}


export const generarOcPDF = (req: Request, res: Response) => {

    // const fs = require('fs');
    // const carbone = require('carbone');
    // const idOc: number = +req.params.idComprasOC;
    // console.log(join(__dirname, "/../../public/ocs"));
    // return res.status(201).json({});

    // let data = {
    //     firstname: 'Yamil',
    //     lastname: 'Hola mundo'
    // };

    // var options = {
    //     convertTo: 'pdf' //can be docx, txt, ...
    // };


    // npm html-pdf
    // var html = fs.readFileSync('./test/businesscard.html', 'utf8');
    // Read file
    // const file = fs.readFileSync(enterPath);

    // carbone.render(join(__dirname, `/../../public/ocs/simple.odt`), data, function (err: any, result: any) {
    //     if (err) return console.log(err);

    //     // write the result
    //     fs.writeFileSync(join(__dirname, `/../../public/ocs/result.odt`), result);
    //     process.exit();
    // });


    return res.status(200).json({ messaje: "ok" });
}