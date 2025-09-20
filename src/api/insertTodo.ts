import { connectDB } from "@/utils/database";

export const insertTodo = async (newTodo: string) => {
  const db = (await connectDB).db("Cluster");

  const todos = await db.collection("todos").find().toArray();
  if(Array.isArray(todos) && todos.length === 0) {
    db.createCollection("todos");
  }
  const todo = await db.collection("todos").insertOne({ todo: newTodo });
  return { _id: todo.insertedId, todo: newTodo};
}