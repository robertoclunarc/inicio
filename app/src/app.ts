import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "./database";
import { join } from "path";
import * as dotenv from 'dotenv';

// dotenv.config({ path: __dirname+'/.env' });
// dotenv.config({path: join(__dirname, '.env')});
dotenv.config();
console.log(join(__dirname, '.env'));

//routes
import comprasRoutes from "./routes/compras/compras.routes"


//Inicialitizations 
const app = express();
app.set("port", process.env.APP_PORT);
// ************

//middlewares
app.use(morgan("dev"));

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:4200", 'http://10.10.0.16', 'http://localhost'],
  credentials: true
}));


//rutas 
app.use(comprasRoutes);
// ************

db.conectarBD();
app.listen(app.get("port"), ()=>{ console.log("Server express on port:", app.get("port")); });

app.get("/", (req, resp) => {
  resp.send("Server http ON!");
});