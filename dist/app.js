"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//rutas
const compras_routes_1 = __importDefault(require("./routes/compras/compras.routes"));
//Inicialitizations 
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
//middleeares
app.use(morgan_1.default("dev"));
//app.use(express.urlencoded({extended: false}));
app.use(express_1.default.json());
app.use(cors_1.default());
//rutas
app.use(compras_routes_1.default);
app.get("/", (req, resp) => {
    resp.send("Server http ON!");
});
app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));
