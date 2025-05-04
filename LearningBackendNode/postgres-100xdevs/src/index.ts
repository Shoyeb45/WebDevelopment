// connect to db
import { Client, Connection } from "pg";

const client = new Client({
    user: "me", // user name
    host: "localhost",
    database: "x100dev",
    password: "password",
    port: 5432
});


// create a user table
async function createUserTable() {
    try {
        await client.connect();
        const result = await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}

// but the below code is prone to SQL injection
// async function insertIntoUserTable(data: any) {
//     try {
//         await client.connect();
//         const result = await client.query(`
//             INSERT INTO users (username, email, password) 
//             VALUES
//             ('${data.username}', '${data.email}', '${data.password}'); 
//         `);    
//         console.log(result);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// below function is safe and secure
async function insertIntoUserTable(data: any) {
    try {
        await client.connect();
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
        const values = [data.username, data.email, data.password];

        const result = await client.query(insertQuery, values);    
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}


// insertIntoUserTable({
//     username: "Shoyeb45",
//     email: "shoyebff4o5@gmail.com",
//     password: "Shoyeb"
// });


async function getUser(email: string) {
    try {
        await client.connect();
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];

        const result = await client.query(query, values);
        
        if (result.rows.length > 0) {
            console.log("User found");
            console.log(result.rows[0]);
            return result.rows[0];
        }
        else {
            console.log("No user found");
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
}


getUser("shoyebff45@gmail.com").catch(console.error);