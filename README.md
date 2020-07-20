# Descripción del modulo
modulo para implementar el back para administrar las solicitudes de pedidos en compras y sus cotizaciones

# compilar 
npm run build

# correr
npm run star


#Solped master
#obtiene todas las solped activas
get("/api/solped", solpedAll); 
#solpeds asociadas al usuario
get("/api/missolped/:idSegUsuario", misSolped);
#crear nueva solpe
post("/api/solped", solpedNew);
#crear nueva solped, solo los datos el maestro
post("/api/notinueva", solpedNew);
#obtener una sola solped
get("/api/solped/:idSolped", solpedOne);
#actualizar una solped
put("/api/solped/:idSolped", updateSolped);
#data del mestro detalle de la solped
get("/api/solpedydetalles", solpedMasterDetalle);
#asignar un usuario a una solped 
put("/api/asignacionsolped/:idSolped", solpedAsignacion);
#cambiar de fase una solped
put("/api/cambiofasesolped", solpedCambioFase);
#aprobacion de una solped a presidencia
get("/api/solspresidencia", solpedPresidencia);


#Solped Detalles
#datos del detalle
get("/api/detallesolped/:idSolped", solpedetalledata);
#actualizar la data del detalle
put("/api/detallesolped/", cambioEstado);

#Solped Trazas
#obtener la data de una traza segun una solped
get("/api/trazassolped/:idSolped", trazassolped);
#insertar una nueva traza
post("/api/trazassolped", inserttrazasolped);

//Orden de compra
#todas las ordenes de compra
get("/api/oc", todasOC);
#insertar una nueva orden de compra - master
post("/api/oc", insertOC);
#actualizar una OC - master
put("/api/oc/:idComprasOC", updateOC);
#obtener todas las ordenes de compra con su detalle
get("/api/ocmasterdetalle/", todasMasterDetalle);

#Orden de compra detalle
#datos del detalle de una OC
get("/api/ocdetalle", detalleOcAll);
#ingresar el detalle de una OC
post("/api/ocdetalle", insertdetalleOC);