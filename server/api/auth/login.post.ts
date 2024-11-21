import { User } from "~/server/models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  const config = useRuntimeConfig();
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Email ou mot de passe incorrect",
    });
  }

  const userPassword = user.toObject().password;
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: "Email ou mot de passe incorrect",
    });
  }

  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      ...user.toObject(),
      password: undefined,
    },
  };
});
