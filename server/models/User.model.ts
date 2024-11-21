import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { generateHash } from "../utils/hash";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  this.password = await generateHash(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = model<User>("User", userSchema);
