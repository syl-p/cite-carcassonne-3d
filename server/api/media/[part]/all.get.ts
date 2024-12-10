import { Medium } from "~/server/models/Medium.model";

export default defineEventHandler(async (event) => {
  const part = getRouterParam(event, "part") ?? "";

  try {
    const files = await Medium.find({ part }).populate("user", "username");
    if (!files) {
      return createError({ statusCode: 401, message: "no Media" });
    }
    return files;
  } catch (error) {
    return createError({ statusCode: 400, message: "Cannot get all media" });
  }
});
