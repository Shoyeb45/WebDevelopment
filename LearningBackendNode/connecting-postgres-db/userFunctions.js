import { pool } from "./connectDB.js";

export const getUsers = (req, res) => {
    
    pool.query("SELECT * FROM users", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ok: true, users: result.rows});
    })
}; 

export const getUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        
        res.status(200).json(results.rows)
    })
}


export const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email], (err, results) => {
        if (err) {
            res.json({message: err.message})
        }
        res.status(200).json({messge: "User created successfully", user: results.rows});
    });
};

export const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email} = req.body;
    
    pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (err, results) => {
            if (err) {
                res.status(401).json({message: err.message});
            }
            res.status(200).json({messge: "User update succefully"});
        }
    )
    
    ;}
    
    
export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [id], (err, results) => {
        if (err) {
            res.json({message: err.message});
        }
        res.status(200).json({message: "User deleted succefully", id: id});
    });
};