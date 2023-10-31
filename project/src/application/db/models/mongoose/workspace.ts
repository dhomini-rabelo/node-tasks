import mongoose, { Document } from 'mongoose'
import { IWorkspaceParams } from '../../schemas/workspace'

interface IWorkspaceParamsMongoose extends Omit<IWorkspaceParams, 'user_id'> {
  user_id: mongoose.Schema.Types.ObjectId
}

const WorkspaceSchema = new mongoose.Schema<IWorkspaceParamsMongoose>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 64,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const WorkspaceModel = mongoose.model<IWorkspaceParamsMongoose>(
  'Workspace',
  WorkspaceSchema,
)

export type IWorkspaceModel = Document<any, any, IWorkspaceParamsMongoose>
