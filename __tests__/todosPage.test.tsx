import { addTodo } from "@/actions/addTodo";
import { getTodos } from "@/api/getTodos";
import Todos from "@/app/todos/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock('@/utils/database', () => {
  const mockCollection = {
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue([]),
    }),
    insertOne: jest.fn().mockResolvedValue({todo: "안녕하세요."}),
  }
  const mockDB = {
    createCollection: jest.fn(),
    collection: jest.fn().mockReturnValue(mockCollection),
  }
  return {
    connectDB: Promise.resolve({
      db: jest.fn().mockReturnValue(mockDB),
    })
  }
})
jest.mock("@/actions/addTodo");
jest.mock("@/api/getTodos.ts");

describe("<Todos /> 서버 컴포넌트", () => {
  it("addTodo 서버 액션이 실행된 후 페이지에 추가된 todo가 출력된다.", async () => {
    (getTodos as jest.Mock).mockResolvedValue([]);

    const todosComponentUI = await Todos();
    render(todosComponentUI);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, {target: {value: "안녕하세요."}});
    fireEvent.change(input, {target: {value: "안녕하세요."}})
    const form = screen.getByTestId("todo-form");
    fireEvent.submit(form);
    
    expect(addTodo).toHaveBeenCalledTimes(1);

    (getTodos as jest.Mock).mockResolvedValue([{_id: 1, todo: "안녕하세요."}]);

    const updatedTodosComponentUI = await Todos();
    render(updatedTodosComponentUI);

    await waitFor(() => {
      const todo = screen.getByRole("listitem");
      expect(todo).toBeInTheDocument();
      expect(todo.textContent).toEqual("안녕하세요.");
    })
  });
})