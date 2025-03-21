import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
    user: "me", // user name
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432
})