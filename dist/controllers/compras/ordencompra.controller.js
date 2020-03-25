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
exports.todasOC = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let consulta = "SELECT * FROM compras_oc";
    const ordenes = yield database_1.default.querySelect(consulta);
    resp.status(401).json(ordenes);
});
exports.todasMasterDetalle = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let consulta = "SELECT * FROM compras_oc";
    let arbol = [];
    const ordenes = yield database_1.default.querySelect(consulta);
    Promise.all(ordenes.map((oc) => __awaiter(void 0, void 0, void 0, function* () {
        let consulta2 = "SELECT * FROM compras_oc_detalle WHERE idComprasOC = ?";
        const detallesOC = yield database_1.default.querySelect(consulta2, [oc.idComprasOC]);
        return arbol.push({ data: oc, children: detallesOC });
    })))
        .then((result) => {
        resp.status(401).json(arbol);
    });
});
exports.insertOC = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const newOC = req.body;
    let consulta = "INSERT INTO compras_oc SET ?";
    const result = yield database_1.default.querySelect(consulta, [newOC]);
    resp.status(401).json(result);
});
exports.updateOC = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idComprasOC;
    const updateSolped = req.body;
    const result = yield database_1.default.querySelect("UPDATE compras_oc SET ? WHERE idComprasOC = ? ", [updateSolped, id]);
    resp.json(result);
});
