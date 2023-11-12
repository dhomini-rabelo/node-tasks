expect.extend({
  nullOrAnyString(received: any) {
    return {
      pass: received === null || typeof received === 'string',
      message: () => '',
    }
  },
})
