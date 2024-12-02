import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { generateHash } from "../utils/hash";
import { User } from "~/server/models/User.model";

export interface Medium extends Document {
  path: string;
  filename: string;
  user: User;
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
  },
  {
    timestamps: true,
  },
);

export const Medium = model<Medium>("Medium", mediumSchema);
