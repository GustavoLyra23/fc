import * as mysql from "mysql2/promise";


export class Database {
    private static instance: mysql.Pool;

    private constructor() { }

    public static getInstance(): mysql.Pool {
        if (!Database.instance) {
            Database.instance = mysql.createPool({
                host: "localhost",
                user: "gustavo",
                password: "123456",
                database: "ticket",
                port: 3306,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            })
        }
        return Database.instance;
    }
}

