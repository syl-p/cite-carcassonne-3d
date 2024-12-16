import { Comment } from "~/server/models/Comment.model";

export default defineEventHandler(async (event) => {
  const part = getRouterParam(event, "part") ?? "";

  try {
    const comments = await Comment.find({ part })
      .sort({ createdAt: -1 })
      .populate("user", "username");
    if (!comments) {
      return createError({ statusCode: 401, message: "no Comment" });
    }
    return comments;
  } catch (error) {
    return createError({ statusCode: 400, message: "Cannot get all media" });
  }
});
