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
    const solpeds = yield database_1.default.querySelect("SELECT * FROM compras_solped");
    resp.json(solpeds);
});
exports.solpedNew = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const newSolped = req.body;
    const solpeds = yield database_1.default.querySelect("INSERT INTO compras_solped SET ? ", [newSolped]);
    resp.json(solpeds);
});
exports.solpedOne = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSolped;
    const solpeds = yield database_1.default.querySelect("SELECT * FROM compras_solped WHERE idSolpedCompras = ? ", [id]);
    resp.status(201).json(solpeds[0]);
});
exports.updateSolped = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSolped;
    const updateSolped = req.body;
    const solpeds = yield database_1.default.querySelect("UPDATE compras_solped SET ? WHERE idSolpedCompras = ? ", [updateSolped, id]);
    resp.status(201).json(solpeds[0]);
});
exports.solpedMasterDetalle = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let consulta1 = "SELECT * "
        + " FROM compras_solped"
        + " WHERE idEstadoActual >= 4";
    let arbol = [];
    const solpeds = yield database_1.default.querySelect(consulta1);
    let detalles = [];
    Promise.all(solpeds.map((sol) => {
        let consulta2 = "SELECT * FROM compras_detalle_solped WHERE idSolpedCompras = " + sol.idSolpedCompras;
        //const detalles: solpeddetalleModelo[] = await db.querySelect(consulta2);
        return database_1.default.querySelect(consulta2).then((detalle) => {
            arbol.push({ data: sol, children: detalle });
        });
    }))
        .then((result) => {
        //console.log(arbol);
        resp.json(arbol);
    });
});
