import { BCryptHashModule } from '../application/dependencies/hash/cases/bcrypt'
import { IHashModule } from '../application/dependencies/hash/contract'

export const HashModule: IHashModule = new BCryptHashModule()
