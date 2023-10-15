import { ZodFormattedError } from 'zod'

export function formatZodError<ISchema>(payload: ZodFormattedError<ISchema>) {
  return Object.entries(payload).reduce(
    (acc: { [key: string]: string[] }, entryData) => {
      const [fieldName, errorBody] = entryData as [
        string,
        string[] | { _errors: string[] },
      ]
      if (!Array.isArray(errorBody)) {
        acc[fieldName] = errorBody._errors
      } else if (errorBody.length > 0) {
        acc.body = errorBody
      }
      return acc
    },
    {},
  )
}
