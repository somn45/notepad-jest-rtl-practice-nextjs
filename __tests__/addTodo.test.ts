import { addTodo } from "@/actions/addTodo";
import { insertTodo } from "@/api/insertTodo";

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

jest.mock("@/api/insertTodo");

describe("addTodo 서버 액션", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("todo formData의 값이 있다면 insertTodo 호출이 된다.", async () => {
    const formData = new FormData();
    formData.set("todo", "안녕하세요.");
    await addTodo(formData);
    expect(insertTodo).toHaveBeenCalledWith("안녕하세요.");
    expect(insertTodo).toHaveBeenCalledTimes(1);
  })
  it("todo formData의 값이 없다면 insertTodo가 호출되지 않는다.", async () => {
    const formData = new FormData();
    formData.set("todo", "");
    await addTodo(formData);
    expect(insertTodo).toHaveBeenCalledTimes(0);
  })
})  