"use server";

import { insertTodo } from "@/api/insertTodo";

export async function addTodo(formData: FormData) {
  const newTodo = formData.get("todo") as string | null;
  if(newTodo && newTodo.length !== 0) await insertTodo(newTodo);


}

