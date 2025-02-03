import protectRoute from "~/server/protectRoute";
import jwt from "jsonwebtoken";
import { User } from "~/server/models/User.model";
export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const body = await readBody(event);
  const token = getHeader(event, "authorization")?.split(" ")[1];
  if (!token) {
    throw createError({ statusCode: 401, message: "Non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret);
    const user: User | null = await User.findOneAndUpdate(
      { _id: decoded.userId },
      {
        username: body.username,
        email: body.email,
      },
      {
        new: true,
        returnOriginal: false,
      },
    );

    return { ...user!.toObject() };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "User update unsuccessful",
    });
  }
});
