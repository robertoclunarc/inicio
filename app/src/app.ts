import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./database";
import { join } from "path";
import comprasRoutes from "./routes/compras/compras.routes"


//Inicialitizations 
const app = express();
app.set("port", process.env.APP_PORT || 3005);
// ************

//middleeares
app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());

// FIXME: Colocar expresamente el origen
app.use(cors({
  origin: "http://localhost:4200",
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