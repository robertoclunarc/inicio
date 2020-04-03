"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
exports.solpedAll = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const solpeds = yield database_1.default.querySelect(`SELECT  sol.*,
                                         (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                         (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                            WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado
                                        FROM compras_solped sol
                                         WHERE idEstadoActual >= 4`);
    resp.status(201).json(solpeds);
});
exports.misSolped = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.params.idSegUsuario;
    const solpeds = yield database_1.default.querySelect(`SELECT  sol.*,
                                         (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                         (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                            WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado
                                        FROM compras_solped sol
                                         WHERE ((idEstadoActual >= 4 AND idEstadoActual < 9) OR idEstadoActual = 11 ) AND sol.idSegUsuario = ?`, [usuario]);
    resp.status(201).json(solpeds);
});
exports.solpedNew = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const newSolped = req.body;
    const solpeds = yield database_1.default.querySelect("INSERT INTO compras_solped SET ? ", [newSolped]);
    resp.json(solpeds);
});
exports.solpedOne = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSolped;
    const solpeds = yield database_1.default.querySelect(`SELECT sol.*,
                                        (SELECT nombre FROM config_gerencias ger WHERE ger.idConfigGerencia = sol.idConfigGerencia) nombre_gerencia,
                                        (SELECT CONCAT(u.primerNombre, ' ', u.primerApellido) FROM seg_usuarios u
                                        WHERE u.idSegUsuario = sol.idSegUsuario) nombre_asignado
                                        FROM compras_solped sol WHERE idSolpedCompras = ? `, [id]);
    resp.status(201).json(solpeds[0]);
});
exports.updateSolped = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSolped;
    const updateSolped = req.body;
    const result = yield database_1.default.querySelect("UPDATE compras_solped SET ? WHERE idSolpedCompras = ? ", [updateSolped, id]);
    resp.status(201).json(result);
});
exports.solpedMasterDetalle = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let consulta1 = "SELECT * "
        + " FROM compras_solped"
        + " WHERE idEstadoActual >= 4";
    let arbol = [];
    const solpeds = yield database_1.default.querySelect(consulta1);
    //let detalles: solpeddetalleModelo[] = [];
    Promise.all(solpeds.map((sol) => {
        let consulta2 = "SELECT * FROM compras_detalle_solped WHERE idSolpedCompras = " + sol.idSolpedCompras;
        //const detalles: solpeddetalleModelo[] = await db.querySelect(consulta2);
        return database_1.default.querySelect(consulta2)
            .then((detalle) => {
            let nododet = {};
            detalle.forEach((det) => {
                nododet = Object.assign({}, det);
                //nododet = Object.assign([{...det}, {children: []}]);
            });
            arbol.push({ data: sol, children: [{ data: nododet, children: [] }] });
        });
    }))
        .then((result) => {
        //console.log(arbol);
        resp.json(arbol);
    });
});
exports.solpedAsignacion = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const solped = req.body;
    const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET idEstadoActual = ?, estadoActual = ?, idSegUsuario = ? WHERE idSolpedCompras = ? ";
    const solpeds = yield database_1.default.querySelect(consulta, [solped.idEstadoActual, solped.estadoActual, solped.idSegUsuario, idSolped]);
    return resp.status(201).json(solpeds);
});
exports.solpedCambioFase = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const solped = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "UPDATE compras_solped SET idEstadoActual = ?, estadoActual = ? WHERE idSolpedCompras = ? ";
    const solpeds = yield database_1.default.querySelect(consulta, [solped.idEstadoActual, solped.estadoActual, solped.idSolpedCompras]);
    return resp.status(201).json(solpeds);
});
exports.solpedPresidencia = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const solped = req.body;
    //const idSolped = req.params.idSolped;
    let consulta = "SELECT * FROM compras_solped WHERE idEstadoActual = 8";
    const solpeds = yield database_1.default.querySelect(consulta);
    return resp.status(201).json(solpeds);
});
