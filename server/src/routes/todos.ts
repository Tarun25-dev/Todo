import { Router } from "express";
import { isValidObjectId } from "mongoose";
import Todo from "../models/todo.js";

interface Todo{
    id: number;
    title: string;
    done: boolean;
};

const router = Router();

// GET /api/todos
router.get("/", async (_req, res) => {
    const todos = await Todo.find().sort({ _id: 1});
    res.json(todos);
});

router.post("/", async (req, res) => {
    const {title} = req.body;
    if(typeof title !== "string" || !title.trim()){
        res.status(400).json({message: "Title is required!"});
        return;
    }
    const todo = await Todo.create({title});
    res.status(201).json(todo);
});

router.patch("/:id", async (req, res) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        res.status(404).json({ message: "Todo not found"});
        return;
    }
    const {title, done} = req.body;
    const update: {title?: string; done?: boolean } = {};

    if(typeof title === "string" && title.trim()){
        update.title = title.trim();
    }
    if(typeof done === "boolean"){
        update.done = done;
    }

    const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
    if(!todo){
        res.status(404).json({ message: "Todo not found"});
        return;
    }
    res.json(todo);
});

router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    if(!isValidObjectId(id)){
        res.status(404).json({message: "Todo not found"});
        return;
    }
    const todo = await Todo.findByIdAndDelete(id);
    if(!todo){
        res.status(404).json({ message: "Todo not found" });
        return
    }
    res.status(204).send();
});

export default router;