import { Schema, Document, models, model } from 'mongoose';

export interface IApplication extends Document {
  realname: string;
  discordname: string;
  age: string;
  time: string;
  email: string;
  phonenumber: string;
  createdAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema<IApplication>(
  {
    realname: { type: String, required: true },
    discordname: { type: String, required: true },
    age: { type: String, required: true },
    time: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot reloads in dev
export default models.Application || model<IApplication>('Application', ApplicationSchema);
