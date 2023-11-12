export function removeUndefinedKeys(object: Record<string, unknown>) {
  const cleanedObject: Record<string, unknown> = {}

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanedObject[key] = value
    }
  })

  return cleanedObject
}
