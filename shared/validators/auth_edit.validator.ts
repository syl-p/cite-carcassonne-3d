import { z } from "zod";

export default z
  .object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    current_password: z.string().min(8),
    password: z.string().min(8).optional(),
    password_confirmation: z.string().min(8).optional(),
  })
  .refine(
    (data) =>
      data.password === data.password_confirmation ||
      !data.password ||
      !data.password_confirmation,
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );
