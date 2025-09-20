import { connectDB } from "@/utils/database";

interface Todos {
  todo: string;
}

export const getTodos = async () => {
  const db = (await connectDB).db("Cluster");
  const todos = await db.collection<Todos>("todos").find().toArray();
  return todos;
}