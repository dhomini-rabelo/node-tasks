import mongoose from 'mongoose'
import { IUser } from '../schemas/users'

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, minlength: 3, maxLength: 64 },
  password: { type: String, required: true },
})

export const UserModel = mongoose.model('User', UserSchema)
