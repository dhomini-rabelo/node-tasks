import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxLength: 64 },
  password: { type: String, required: true },
})

export const UserModel = mongoose.model('User', UserSchema)
