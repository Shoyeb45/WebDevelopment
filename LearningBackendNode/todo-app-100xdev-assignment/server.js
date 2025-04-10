import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { type } from "os";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded());

// route to get all the datas 
app.get("/todos", (request, response) => {
    fs.readFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", "utf8", (err, data) => {
        console.log(data);

        if (err) {
            response.status(500).json({ err });
        }
        response.status(201).json(JSON.parse(data));

    })
});


app.get("/todos/:id", (req, res) => {
    try {
        const id = req.params.id;

        fs.readFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", "utf8", (err, data) => {
            if (err) {
                res.status(500).json({ err });
            }

            const todoList = JSON.parse(data);
            const todo = todoList.find((todo) => todo.id.toString() === id);

            if (todo) {
                return res.status(200).json({
                    ok: true,
                    message: `Todo with id ${id} found`,
                    todo: todo
                });
            }

            return res.status(404).json({
                ok: false,
                message: `Todo with id ${id} not found`
            });
        })
    } catch (error) {
        console.error(error.message);

    }
});


app.post("/todos", (req, res) => {
    console.log(req.body);

    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({
            message: "Title or description is empty"
        });
    }


    fs.readFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", (err, data) => {

        if (err) {
            res.status(500).json({ err });
        }
        const todoList = JSON.parse(data);
        if (todoList.length === 0) {
            todoList.push({
                id: 1,
                title: title,
                description: description,
            });
        }
        else {
            todoList.push({
                id: todoList[todoList.length - 1].id + 1,
                title: title,
                description: description,
            });
        }

        fs.writeFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", JSON.stringify(todoList), (err) => {
            if (err) {
                res.status(500).json({ err });
            }
            res.status(200).json({
                ok: true,
                message: "New Todo created successfully",
                todo: todoList[todoList.length - 1],
            });
        });
    });
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        fs.readFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", (err, data) => {
            if (err) {
                res.status(500).json({ err });
            }   

            const todoList = JSON.parse(data);
            let isFound = false;
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id.toString() === id) {
                    isFound = true;
                    todoList[i].description = todo.description;
                    todoList[i].title = todo.title;
                    break;
                }
            }

            if (!isFound) {
                res.status(404).json({
                    ok: false,
                    message: `Todo with id ${id} not found`,
                })
            }
            
            fs.writeFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", JSON.stringify(todoList), (err) => {
                if (err) {
                    res.status(500).json({ err });
                }
            });

            res.status(200).json({
                ok: true,
                message: `Todo with id ${id} found and updated successfully`,
                todo: {
                    id: id,
                    ...todo
                }
            })
        });
    } catch (error) {
        console.error(error);
        
    }
})

app.delete("/todos/:id", (req, res) => {
   const id = req.params.id;
   
   try {
       fs.readFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", (err, data) => {
            if (err) {
                res.status(500).json({ err });
            }
            const todoList = JSON.parse(data);

            let deletedTodo;
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id.toString() === id) {
                    deletedTodo = todoList[i];
                    todoList.splice(i, 1);
                    break;
                }
            }

            if (!deletedTodo) {
                res.status(404).json({
                    ok: false,
                    message: `Todo with id ${id} does not exist`,
                });
            }

            fs.writeFile("./LearningBackendNode/todo-app-100xdev-assignment/todos.json", JSON.stringify(todoList), (err) => {
                if (err) {
                    res.status(500).json({ err });
                }
            });

            res.status(201).json({
                ok: true,
                message: `Todo with id ${id} found and deleted`,
                todo: deletedTodo,
            });
        });
   } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unexpected error",
            error : error,
        });
   }
});
app.get("*", (req, res) => {
    res.status(404).json({ "message": "Route not found", "ok": false });
});

app.post("*", (req, res) => {
    res.status(404).json({ "message": "Route not found", "ok": false });
});

app.listen(3000);