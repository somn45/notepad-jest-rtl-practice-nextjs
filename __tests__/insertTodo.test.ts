import { insertTodo } from "@/api/insertTodo"
import { resolve } from "path"

jest.mock('@/utils/database', () => {
  const mockCollection = {
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue([]),
    }),
    insertOne: jest.fn().mockImplementation((newTodo: string) => new Promise((resolve) => {
      resolve({ insertedId: 1, todo: newTodo })
    })),
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

describe("insertTodo API", () => {
  it("insertTodo가 실행되면 newTodo를 매개변수로 받아 objectId를 포함한 todo 객체가 return된다.", async () => {
    const todo = await insertTodo("안녕하세요.");
    expect(todo).toEqual({_id: 1, todo: "안녕하세요."});
  })
})