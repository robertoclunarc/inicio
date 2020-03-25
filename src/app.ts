import express from "express";
import morgan from "morgan";
import cors from "cors";


//rutas
import comprasRoutes from "./routes/compras/compras.routes"

//Inicialitizations 
const app =  express();
app.set("port", process.env.PORT || 3000);

//middleeares
app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//rutas
app.use(comprasRoutes);

app.get("/", (req, resp) => {
    resp.send("Server http ON!");
});

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));