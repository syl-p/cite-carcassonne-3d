import { Medium } from "~/server/models/Medium.model";
import protectRoute from "~/server/protectRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);

  try {
    const files = await readMultipartFormData(event);
    if (!files) {
      return createError({ statusCode: 400, message: "No files uploaded" });
    }

    // Uploads
    for (const file of files) {
      await useStorage().setItemRaw(`fs:${file.filename}`, file.data);
      await Medium.create({
        filename: file.filename,
        path: `/${file.filename}`,
        user: event.context.user,
      });
    }

    return { success: true };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Upload error",
    });
  }
});
