import { Router } from "express";

interface Todo{
    id: number;
    title: string;
    done: boolean;
};

const router = Router();

let todos: Todo [] = [];
let nextId = 1;


// GET /api/todos
router.get("/", (req, res) => {
    res.json(todos);
});

router.post("/", (req, res) => {
    const {title} = req.body;
    if(typeof title !== "string" || !title.trim()){
        res.status(400).json({message: "Title is required!"});
        return;
    }
    const todo: Todo = { id: nextId++, title: title.trim(), done: false }
    todos.push(todo);
    res.status(201).json(todo);
});

router.patch("/:id", (req, res) => {
    const todo = todos.find((t) => String(t.id) === req.params.id);
    if(!todo){
        res.status(404).json({ message: "Todo not found"});
        return;
    }
    const {title, done} = req.body;
    if(typeof title === "string" && title.trim()){
        todo.title = title.trim();
    }
    if(typeof done === "boolean"){
        todo.done = true;
    }
    res.json(todo);
});

router.delete("/:id", (req, res) => {
    const index = todos.findIndex((t) => String(t.id) === req.params.id);
    if(index === -1){
        res.status(404).json({message: "Todo not found"});
        return;
    }
    todos.splice(index, 1);
    res.status(204).send();
});

export default router;