import { env } from '../dependencies/env'

/* eslint-disable */
// @ts-ignore 
module.parent = {
  ...(module.parent || {}),
  filename:
    `${env.BASE_PATH}/project/src/core/routes/routes.ts`,
}

const requireDir = require('require-dir')

export default requireDir
