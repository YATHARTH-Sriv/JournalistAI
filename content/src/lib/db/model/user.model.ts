import mongoose ,{Schema,Document} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    username: string;
    credits: number;
  }

const UserSchema: Schema<User>=new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    credits: { type: Number, default: 0 },
  },{timestamps:true})


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;