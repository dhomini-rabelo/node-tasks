import mongoose, { Document } from 'mongoose'
import { ITaskParams } from '../../schemas/tasks'

interface ITaskParamsMongoose extends Omit<ITaskParams, 'user_id'> {
  user_id: mongoose.Schema.Types.ObjectId
}

const taskSchema = new mongoose.Schema<ITaskParamsMongoose>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 64,
  },
  description: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const taskModel = mongoose.model<ITaskParamsMongoose>('task', taskSchema)

export type ITaskModel = Document<any, any, ITaskParamsMongoose>
