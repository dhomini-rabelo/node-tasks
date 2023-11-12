export const TaskModelSchema = {
  id: expect.any(String),
  title: expect.any(String),
  description: expect.any(String),
  isDone: expect.any(Boolean),
  user_id: expect.any(String),
}
