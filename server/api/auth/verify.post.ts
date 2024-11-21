import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token } = body;

  try {
    const config = useRuntimeConfig();
    jwt.verify(token, config.jwtSecret);
    return true;
  } catch (err) {
    throw createError({ statusCode: 401, message: "Token invalide ou expiré" });
  }
});
