import express from "express";
import morgan from "morgan"; //trazas de consolas en las peticiones
import cors from "cors";
import db from "./database";
import { join } from "path";
import comprasRoutes from "./routes/compras/compras.routes"


//Inicialitizations 
const app = express();
app.set("port", process.env.APP_PORT || 3005);
// ************

//middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:4200", 'http://10.10.0.16', 'http://localhost'],
  credentials: true
}));

app.use(`/public`, express.static(join(__dirname, 'public')));
// ************

//rutas 
app.use(comprasRoutes);
// ************

db.conectarBD();
app.listen(app.get("port"), ()=>{ console.log("Server express on port:", app.get("port")); });

app.get("/", (req, resp) => {
  resp.send("Server http ON!");
});