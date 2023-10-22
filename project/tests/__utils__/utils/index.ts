export function sleep(ms: number) {
  /* eslint-disable no-promise-executor-return */
  return new Promise((resolve) => setTimeout(resolve, ms))
}
