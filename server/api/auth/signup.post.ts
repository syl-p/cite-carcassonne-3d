import { User } from "~/server/models/User.model";
import signupValidator from "~/server/validators/signup.validator";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    signupValidator.safeParse(body),
  );

  const user = await User.create(body.data);

  return {
    ...user.toObject(),
    password: undefined,
  };
});
