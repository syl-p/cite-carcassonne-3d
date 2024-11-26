import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { generateHash } from "../utils/hash";

export interface Medium extends Document {
  path: string;
  filename: string;
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
  },
  {
    timestamps: true,
  },
);

export const Medium = model<Medium>("Medium", mediumSchema);
