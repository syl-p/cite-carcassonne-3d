import { Medium } from "~/server/models/Medium.model";
import protectRoute from "~/server/protectRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const part = getRouterParam(event, "part");

  try {
    const files = await readMultipartFormData(event);

    if (!files) {
      return createError({ statusCode: 400, message: "No files uploaded" });
    }

    // Uploads
    const media: Medium[] = [];
    for (const file of files) {
      await useStorage().setItemRaw(`fs:${part}/${file.filename}`, file.data);
      const medium = await Medium.create({
        filename: file.filename,
        path: `${part}/${file.filename}`,
        user: event.context.user,
        part: part,
      });

      await medium.populate("user", "username");
      media.push(medium);
    }

    return media;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Upload error",
    });
  }
});
