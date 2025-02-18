import jwt from "jsonwebtoken";
import type { EventHandlerRequest, H3Event } from "h3";
import { decodeToken } from "~/server/utils/token";

export default async (event: H3Event<EventHandlerRequest>) => {
  const token = getHeader(event, "authorization")?.split(" ")[1];
  if (!token) {
    throw createError({ statusCode: 401, message: "Non autorisé" });
  }

  try {
    const decoded = decodeToken(token);
    event.context.user = decoded.userId;
  } catch (error) {
    throw createError({ statusCode: 401, message: "Token invalide" });
  }
};
