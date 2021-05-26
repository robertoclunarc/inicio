import { updatePorCambioTasa } from './../../controllers/compras/detalleoc.cotroller';
import { Router } from "express";
import {
    solpedAll, solpedNew, solpedOne, updateSolped, solpedMasterDetalle,
    solpedAsignacion,
    misSolped,
    solpedCambioFase, solpedPresidencia, solpedAllOc, solpedDetalleOne, updateMontoTotal, solpedEmpresaAAfacturar,
    aprobacionSolPed,
} from "../../controllers/compras/solped.controller";


import { solpedetalledata, cambioEstado, delDetallesSolped, insertDetalleSolped, updateGenerado, getTotalDetallesNoProcess, updateDetalle } 
    from "../../controllers/compras/solpeddetalle.controller";
import { trazassolped, inserttrazasolped, inserttrazaOC } from "../../controllers/compras/solpedtraza.controller";
import { insertOC, updateOC, todasOC, todasMasterDetalle, detalleOneOC, getOneOC, updateMontoTotalOrdenCompra, updateCorrelativo, generarOcPDF } 
        from "../../controllers/compras/ordencompra.controller";
import { insertdetalleOC, detalleOcAll } from "../../controllers/compras/detalleoc.cotroller";
import { allproveedores, oneproveedor, todosAlmacenesArbol } from "../../controllers/compras/proveedores.controller";
import { createRecord, deleteRecord, SelectRecordAll, SelectRecordFilter, updateRecord } from '../../controllers/compras/proveedorescrud.controller';

const router = Router();

router.get("/api/solped", solpedAll);
router.get("/api/solped-aprobadas", solpedAllOc);
router.get("/api/missolped/:idSegUsuario", misSolped);
router.post("/api/solped", solpedNew);
router.put("/api/solped/:idSolped", updateSolped);
// router.post("/api/notinueva", solpedNew);
router.get("/api/solped/:idSolped", solpedOne);
router.get("/api/solped/:idSolped/detalles", solpedDetalleOne);
router.get("/api/solpedydetalles", solpedMasterDetalle);
router.put("/api/asignacionsolped/:idSolped", solpedAsignacion);
router.put("/api/cambiofasesolped", solpedCambioFase);
router.put("/api/update-aprob-presi", aprobacionSolPed);
router.put("/api/setempresafacturar", solpedEmpresaAAfacturar);
router.put("/api/update-monto", updateMontoTotal);
//router.put("/api/arevisionporpresi", todasMasterDetalle); //POSIBLE DESRAROLLO
router.get("/api/solspresidencia", solpedPresidencia);

//Solped Detalles
router.get("/api/detallesolped/:idSolped", solpedetalledata);
router.get("/api/total-det-noprocess/:idSolped", getTotalDetallesNoProcess);
router.post("/api/detallesolped/", insertDetalleSolped);
router.put("/api/detallesolped/", cambioEstado);
router.put("/api/detallesolped/:idDetalle", updateDetalle);
router.delete("/api/detallessolped/:idSolped", delDetallesSolped);
router.put("/api/updatesolpedgen", updateGenerado);

//Solped Trazas
router.get("/api/trazassolped/:idSolped", trazassolped);
router.post("/api/trazassolped", inserttrazasolped); 

//Orden de compra
router.get("/api/oc", todasOC);
router.post("/api/oc", insertOC);
router.put("/api/oc/:idComprasOC", updateOC);
router.get("/api/ocmasterdetalle/", todasMasterDetalle);
router.get("/api/oc/:idComprasOC/detalles", detalleOneOC);
router.get("/api/oc/:idComprasOC", getOneOC); 
router.put("/api/oc/update-monto/:idComprasOC", updateMontoTotalOrdenCompra);
router.put("/api/oc/update-correlativo/:idComprasOC", updateCorrelativo);
router.post("/api/oc/generar-oc/:idComprasOC", generarOcPDF);

//Orden de compra detalle
router.get("/api/ocdetalle", detalleOcAll);
router.post("/api/ocdetalle", insertdetalleOC); 
router.put("/api/ocdetalle/update-por-tasa/:idDetalleOC", updatePorCambioTasa);
//TrazasOC FIXME:Debe ser su propio controller, pero para mas rapidez, refactorizar 
router.post("/api/trazaoc", inserttrazaOC); 

//proveedores
router.get("/api/proveedores", allproveedores);
router.get("/api/proveedores/:idProvee", oneproveedor);


router.get('/consultar', SelectRecordAll);
router.get('/filtrar/:Id/:nombre/:rif/:direccion/:valoracion/:telefono/:observaciones/:contacto', SelectRecordFilter);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec', deleteRecord);

// router.post("/api/proveedores", insertarProveedor);
//router.get("/api/tree", todosAlmacenesArbol);

export default router;