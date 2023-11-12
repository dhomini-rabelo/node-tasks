import mongoose, { Document } from 'mongoose'
import { IUserParams } from '../../schemas/users'

const UserSchema = new mongoose.Schema<IUserParams>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxLength: 64,
  },
  password: { type: String, required: true },
})

export const UserModel = mongoose.model<IUserParams>('User', UserSchema)

// eslint-disable-next-line
export type IUserModel = Document<any, any, IUserParams>
