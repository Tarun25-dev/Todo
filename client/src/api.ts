import type {Todo} from "./types";

const API_URL = "http://localhost:5000/api/todos";

// get all todos
export async function getTodos(): Promise<Todo[]>{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Failed to load todos");
    return res.json();
}

// create a new todo
export async function createTodo(title: string): Promise<Todo>{
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title});
    });
    if(!res.ok) throw new Error("Failed to create todo");
    return res.json(); //Reads the response body and converts the JSON text into a JavaScript array.
}

// Mark a todo as done / not done
export async function toggleTodo(id: string, done: boolean): Promise<Todo>{
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({done}),
    });
    if(!res.ok) throw new Error("Failed to update todo");
    return res.json();
}

// Delete a todo
export async function deleteTodo(id: number): Promise<void>{
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if(!res.ok) throw new Error("Failed to delete todo");
}