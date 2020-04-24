import express from "express";
import morgan from "morgan";
import cors from "cors";


//rutas
import comprasRoutes from "./routes/compras/compras.routes"


//Inicialitizations 
const app =  express();
app.set("port", process.env.PORT || 3000);
const fetch = require("node-fetch");


//middleeares
app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(async (req, resp, next) => {
    console.log('Time:', Date.now());
    //resp.set('X-XSS-Protection', "0");
   console.log("headers : ", JSON.stringify(req.headers));
    //const f_response = await fetch(`https://jsonplaceholder.typicode.com/posts`); 
    // const f_response = await fetch(`http://localhost:3000/api/auth/verify`);
    //console.log("Resp", f_response.Headers);  
    //req.header('Access-Control-Expose-Headers');
    //req.body = {json:"auth"}; 
  next();
})

//rutas
app.use(comprasRoutes);



app.get("/", (req, resp) => {
    resp.send("Server http ON!");
});

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));