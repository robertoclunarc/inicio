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
exports.solpedetalledata = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idSolped = req.params.idSolped;
    let consulta = `SELECT det.*, 
                    (SELECT nombre FROM adm_areas_trabajo areaT WHERE det.idAreaTrabajo = areaT.idAreaTrabajo) AS nombre_trabajo,
                    (SELECT nombre FROM adm_activos activos WHERE activos.idAdmActivo = det.nroActivo) AS nombre_activo,
                    (SELECT nombre FROM compras_proveedores c WHERE c.idProveedor = det.idProveedor) AS nombre_proveedor
                    FROM compras_detalle_solped det WHERE det.idSolpedCompras = ?`;
    const detalles = yield database_1.default.querySelect(consulta, [idSolped]);
    resp.status(201).json(detalles);
});
exports.cambioEstado = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = req.body;
    let consulta = `UPDATE compras_detalle_solped SET 
                            cant_encontrada = ?, 
                            precio = ?, 
                            idProveedor = ?, 
                            notas = ?
                    WHERE idSolpedCompras = ?`;
    const result = yield database_1.default.querySelect(consulta, [detalle.cant_encontrada, detalle.precio,
        detalle.idProveedor, detalle.notas, detalle.idSolpedCompras]);
    resp.status(201).json(result);
});
