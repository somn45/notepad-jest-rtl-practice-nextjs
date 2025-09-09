import { insertTodo } from "@/actions/addTodo";
import { getTodos } from "@/api/getTodos";
import Todos from "@/app/todos/page"
import { connectDB } from "@/utils/database";
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("../src/api/getTodos.ts");
jest.mock("@/utils/database");

describe("<Todos />", () => {

  it("todo 추가", async () => {
    (getTodos as jest.Mock).mockResolvedValue([]);

    const TodosComponentUI = await Todos();
    render(TodosComponentUI);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {target: { value: "안녕하세요." }});
    const newTodo = await insertTodo('안녕하세요.');

    const db = (await connectDB).db("Cluster");

    expect(db.collection).toHaveBeenCalledWith("todos");
    expect(db.collection("todos").find().toArray).toHaveBeenCalled();
    expect(newTodo).toEqual({todo: "안녕하세요."});
  })
})  