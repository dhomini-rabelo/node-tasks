export const TaskModelSchema = {
  id: expect.any(String),
  title: expect.any(String),
  description: expect.anyStringOrNull(),
  isDone: expect.any(Boolean),
  user_id: expect.any(String),
}
