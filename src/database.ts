import mysql from "mysql2/promise";

class database {

    cnn: any;



    async conectarBD() {
        /*    this.cnn.connect((err) => {
               if (err) throw err;
               console.log("Database is connected!");
           }); */
        //await this.cnn.query
        this.cnn = await mysql.createPool({
           // host: "10.1.1.32",
            connectionLimit : 2,
            host: "localhost",
            user: "root",
            //password: "4c3r04dm1n",
            password: "root",
            database: "intranet"
        }).getConnection();
    }

    getC() {
        return this.cnn;
    }

    private desconectarDB() {
        this.cnn.release();
    }

    async querySelect(sql: string, data?: any) {
        
        let result :any = null;
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
