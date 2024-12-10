import { model, Schema } from "mongoose";
import { User } from "~/server/models/User.model";

export interface Comment extends Document {
  content: string;
  user: User;
  part: string;
}

const CommentSchema = new Schema(
  {
    content: {
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

export const Comment = model<Comment>("Comment", CommentSchema);
