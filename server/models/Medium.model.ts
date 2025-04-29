import { model, Schema } from "mongoose";
import { User } from "~/server/models/User.model";

export interface Medium extends Document {
  path: string;
  filename: string;
  user: User;
  part: string;
}

const mediumSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    part: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Medium = model<Medium>("Medium", mediumSchema);
