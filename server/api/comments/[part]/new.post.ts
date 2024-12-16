import protectRoute from "~/server/protectRoute";
import { Comment } from "~/server/models/Comment.model";

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const part = getRouterParam(event, "part");
  const body = await readBody(event);

  try {
    const comment = await Comment.create({
      content: body.content,
      user: event.context.user,
      part,
    });
    await comment.populate("user", "username");
    return { ...comment.toObject() };
  } catch (error) {
    return createError({ statusCode: 500, message: "Comment unsuccessful" });
  }
});
