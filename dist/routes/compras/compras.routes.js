"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solped_controller_1 = require("../../controllers/compras/solped.controller");
const solpeddetalle_controller_1 = require("../../controllers/compras/solpeddetalle.controller");
const solpedtraza_controller_1 = require("../../controllers/compras/solpedtraza.controller");
const ordencompra_controller_1 = require("../../controllers/compras/ordencompra.controller");
const detalleoc_cotroller_1 = require("../../controllers/compras/detalleoc.cotroller");
const proveedores_controller_1 = require("../../controllers/compras/proveedores.controller");
const router = express_1.Router();
router.get("/api/solped", solped_controller_1.solpedAll);
router.get("/api/missolped/:idSegUsuario", solped_controller_1.misSolped);
router.post("/api/solped", solped_controller_1.solpedNew);
router.get("/api/solped/:idSolped", solped_controller_1.solpedOne);
router.put("/api/solped/:idSolped", solped_controller_1.updateSolped);
router.get("/api/solpedydetalles", solped_controller_1.solpedMasterDetalle);
router.put("/api/asignacionsolped/:idSolped", solped_controller_1.solpedAsignacion);
router.put("/api/cambiofasesolped", solped_controller_1.solpedCambioFase);
//Solped Detalles
router.get("/api/detallesolped/:idSolped", solpeddetalle_controller_1.solpedetalledata);
//Solped Trazas
router.get("/api/trazassolped/:idSolped", solpedtraza_controller_1.trazassolped);
router.post("/api/trazassolped", solpedtraza_controller_1.inserttrazasolped);
//Orden de compra
router.get("/api/oc", ordencompra_controller_1.todasOC);
router.post("/api/oc", ordencompra_controller_1.insertOC);
router.put("/api/oc/:idComprasOC", ordencompra_controller_1.updateOC);
router.get("/api/ocmasterdetalle/", ordencompra_controller_1.todasMasterDetalle);
//Orden de compra detalle
router.get("/api/ocdetalle", detalleoc_cotroller_1.detalleOcAll);
router.post("/api/ocdetalle", detalleoc_cotroller_1.insertdetalleOC);
//proveedores
router.get("/api/proveedores", proveedores_controller_1.allproveedores);
router.post("/api/proveedores", proveedores_controller_1.insertarProveedor);
exports.default = router;
