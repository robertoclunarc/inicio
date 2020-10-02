import mysql from "mysql2/promise";

class database {
    cnn: any;

    async conectarBD() {
        this.cnn = await mysql.createPool({
            // host: "10.1.1.32",
            connectionLimit: 2,
            host: process.env.MYSQL_SERVER || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PW || ".4C3r04dm1n", //
            database: process.env.MYSQL_DB || "intranet"
        }).getConnection();
    }

    getC() {
        return this.cnn;
    }

    private desconectarDB() {
        this.cnn.release();
    }

    async querySelect(sql: string, data?: any) {

        let result: any = null;
        if (!data) {
            result = await this.cnn.query(sql);
        } else {
            result = await this.cnn.query(sql, data);
        }
        await this.cnn.release();
        //this.cnn = null;
        this.desconectarDB();
        return result[0];
    }

    async inuup() {
        // const 

    }


}

const db = new database();
db.conectarBD();

export default db;
