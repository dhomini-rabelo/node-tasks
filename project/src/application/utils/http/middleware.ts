import express from 'express'

export function removeMiddleware(
  app: express.Application,
  middlewareToRemove: any,
) {
  let removed = false

  app._router.stack.forEach((route: any, index: number, routes: any) => {
    if (route.handle === middlewareToRemove) {
      routes.splice(index, 1)
      removed = true
    }
  })

  return removed
}
