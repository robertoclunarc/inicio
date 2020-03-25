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
exports.trazassolped = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const idsolped = req.params.idSolped;
    let consulta = "SELECT * FROM compras_traza_solped WHERE idSolpedCompras = ?";
    const trazas = yield database_1.default.querySelect(consulta, [idsolped]);
    resp.status(201).json(trazas);
});
exports.inserttrazasolped = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const itraza = req.body;
    let consulta = "INSERT INTO compras_traza_solped SET ?";
    try {
        const result = yield database_1.default.querySelect(consulta, [itraza]);
        resp.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        resp.json({ "Error": error });
    }
});
