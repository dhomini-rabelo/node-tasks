import mongoose, { Document } from 'mongoose'
import { IWorkspaceParams } from '../../schemas/workspace'

const WorkspaceSchema = new mongoose.Schema<IWorkspaceParams>({
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
})

export const WorkspaceModel = mongoose.model<IWorkspaceParams>(
  'IWorkspace',
  WorkspaceSchema,
)

export type IWorkspaceModel = Document<any, any, IWorkspaceParams>
