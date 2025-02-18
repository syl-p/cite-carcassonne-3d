import { User } from "~/server/models/User.model";
import jwt from "jsonwebtoken";
import signupValidator from "#shared/validators/signup.validator";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readValidatedBody(event, (body) =>
    signupValidator.safeParse(body),
  );

  const user = await User.create(body.data);
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
