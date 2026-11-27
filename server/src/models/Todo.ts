import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
});

// Return "id" instead of MongoDB's "_id" so the frontend needs no changes
todoSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
    },
});

export default model("Todo", todoSchema, "todos");