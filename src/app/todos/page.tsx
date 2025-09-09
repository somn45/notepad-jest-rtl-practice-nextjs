import { addTodo } from "@/actions/addTodo";
import { getTodos } from "@/api/getTodos";

interface Todos {
  todo: string;
}

export default async function Todos() {
  const todos = await getTodos();

  return (
    <section>
      <form action={addTodo}>
        <input type="text" name="todo" placeholder="할 일 입력" />
        <button type="submit">할 일 제출</button>
      </form>
      <ul>
        {todos.map(todoContent => (
          <li key={todoContent._id.toString()}>{todoContent.todo}</li>
        ))}
      </ul>
    </section>
  )
}