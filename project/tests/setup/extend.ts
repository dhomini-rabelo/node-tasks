expect.extend({
  anyStringOrNull(received: any) {
    return {
      pass: received === null || typeof received === 'string',
      message: () => '',
    }
  },
})
