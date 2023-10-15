import mongoose from 'mongoose'

export interface IBaseSchema {
  _id: mongoose.Schema.Types.ObjectId
}
