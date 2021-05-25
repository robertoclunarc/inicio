import express from "express";
import morgan from "morgan"; //trazas de consolas en las peticiones
import cors from "cors";
import db from "./database";
// import { join } from "path";
import * as dotenv from 'dotenv';

// dotenv.config({ path: __dirname+'/.env' });
// dotenv.config({path: join(__dirname, '.env')});
dotenv.config();

//routes
import comprasRoutes from "./routes/compras/compras.routes"


//Inicialitizations 
const app = express();
app.set("port", process.env.APP_PORT);
// ************

//middlewares
app.use(morgan("dev"));
app.use(express.json());
const wl = process.env.WHITE_LIST?.split(",");
// console.log("Whitelist: ", wl);

app.use(cors({
	origin: ["http://localhost:4200", 'http://10.10.0.16',  'http://10.10.0.7', 'http://localhost'],
	//origin: wl,
	credentials: true
}));


//rutas 
app.use(comprasRoutes);
// ************

db.conectarBD();
app.listen(app.get("port"), () => { console.log("Server express on port:", app.get("port")); });


app.get("/", (req, resp) => {
	resp.send("Server http ON!");
});