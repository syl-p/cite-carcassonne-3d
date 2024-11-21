import jwt from "jsonwebtoken";
import { User } from "~/server/models/User.model";
import protectRoute from "~/server/protectRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);
  const token = getHeader(event, "authorization")?.split(" ")[1];
  if (!token) {
    throw createError({ statusCode: 401, message: "Non autorisé" });
  }
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret);
    const user = await User.findById(decoded.userId).select("-password");
    return { ...user.toObject() };
  } catch (error) {
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
});
