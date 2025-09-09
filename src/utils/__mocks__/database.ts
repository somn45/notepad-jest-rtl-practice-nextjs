export const mockCollection = {
  find: jest.fn().mockReturnValue({
    toArray: jest.fn().mockResolvedValue([]),
  }),
  insertOne: jest.fn().mockResolvedValue({todo: "안녕하세요."}),
}
export const mockDB = {
  createCollection: jest.fn(),
  collection: jest.fn().mockReturnValue(mockCollection),
}

export const connectDB = Promise.resolve({
  db: jest.fn().mockReturnValue(mockDB),
});