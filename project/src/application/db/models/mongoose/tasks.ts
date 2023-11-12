import mongoose, { Document } from 'mongoose'
import { ITaskParams } from '../../schemas/tasks'

interface ITaskParamsMongoose extends Omit<ITaskParams, 'user_id'> {
  user_id: mongoose.Schema.Types.ObjectId
}

const TaskSchema = new mongoose.Schema<ITaskParamsMongoose>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxLength: 64,
  },
  description: {
    type: String,
    default: null,
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

export const TaskModel = mongoose.model<ITaskParamsMongoose>('task', TaskSchema)

// eslint-disable-next-line
export type ITaskModel = Document<any, any, ITaskParamsMongoose>
