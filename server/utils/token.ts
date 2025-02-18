import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, useRuntimeConfig().jwtSecret);
  } catch (error) {
    throw createError({
      status: 401,
      message: "Invalid token",
    });
  }
};
