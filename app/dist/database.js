"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
class database {
    conectarBD() {
        return __awaiter(this, void 0, void 0, function* () {
            /*    this.cnn.connect((err) => {
                   if (err) throw err;
                   console.log("Database is connected!");
               }); */
            //await this.cnn.query
            this.cnn = yield promise_1.default.createPool({
                // host: "10.1.1.32",
                connectionLimit: 2,
                host: "localhost",
                user: "root",
                //password: "4c3r04dm1n",
                password: "root",
                database: "intranet"
            }).getConnection();
        });
    }
    getC() {
        return this.cnn;
    }
    desconectarDB() {
        this.cnn.release();
    }
    querySelect(sql, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            if (!data) {
                result = yield this.cnn.query(sql);
            }
            else {
                result = yield this.cnn.query(sql, data);
            }
            yield this.cnn.release();
            //this.cnn = null;
            this.desconectarDB();
            return result[0];
        });
    }
    inuup() {
        return __awaiter(this, void 0, void 0, function* () {
            // const 
        });
    }
}
const db = new database();
db.conectarBD();
exports.default = db;
