export const TaskModelSchema = {
  id: expect.any(String),
  title: expect.any(String),
  description: expect.nullOrAnyString(),
  isDone: expect.any(Boolean),
  user_id: expect.any(String),
}

// eslint-disable-next-line
const { id, ...params } = TaskModelSchema

export const TaskParamsModelSchema = {
  ...params,
}
