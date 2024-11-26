import { Medium } from "~/server/models/Medium.model";

export default defineEventHandler(async (event) => {
  try {
    const files = await Medium.find();
    if (!files) {
      return createError({ statusCode: 401, message: "no Media" });
    }
    return files;
  } catch (error) {
    return createError({ statusCode: 400, message: "Cannot get all media" });
  }
});
