import express from "express";
import bodyParser from "body-parser";
import { todoSchema, todoUpdateSchema } from "./utils/types.util.js";
const app = express();
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import { Todo } from "./models/todo.model.js";
import cors from "cors";

app.use(cors({
    origin: "*"
}));

dotenv.config({
    path : "./.env",
})
app.use(bodyParser.json());

// body -> {
//  title: string,
//  description: string,
// }
app.post("/todo", async function (req, res) {
    try {
        const todo = todoSchema.parse(req.body);
        
        // upload in mongoDB
        const createdTodo = await Todo.create(todo);
        if (!createdTodo) {
            res.status(500).json({
                message: "Failed to save todo in db"
            });
            return;
        }

        console.log(todo);
        res.status(201).json({
            message: "Todo created successfully",
            todo: createdTodo
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error
        });
    }
});

app.get("/todos", async function (req, res) {
    try {
        const todos = await Todo.find({});

        if (!todos) {
            res.status(404).json({
                message: "Unexpected error while getting all the todos."
            });
            return;
        }

        res.status(200).json({
            message: "All todos fetched successfully.",
            todos: todos
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error
        });
    }
});



app.put("/complete", async (req, res) => {
    try {
        const { id } = todoUpdateSchema.parse(req.body);
        console.log(id);
        
        const result = await Todo.findByIdAndUpdate({
            _id: id
        }, {
            completed: true
        });

        if (!result) {
            res.status(500).json({
                message: "something unexpected happened while marking the todo as marked"
            });
        }

        res.status(200).json({
            message: "Todo marked as completed",
            todo: result
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error
        });
        return;
    }
});


connectDB().
  then((res) => {
    app.listen(3000, () => {
        console.log("Server is running");
    }) 
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });