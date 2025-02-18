import protectRoute from "~/server/protectRoute";
import bcrypt from "bcryptjs";
import { User } from "~/server/models/User.model";
import auth_editValidator from "#shared/validators/auth_edit.validator";

export default defineEventHandler(async (event) => {
  await protectRoute(event);

  // BODY SAFE VALIDATION
  const body = await readValidatedBody(event, (body) =>
    auth_editValidator.safeParse(body),
  );

  if (body.error) {
    throw createError({
      statusCode: 422,
      data: body.error.errors,
      message: "Erreurs lors de la validation des données",
    });
  }

  // GET USER INFOS
  const user = await User.findOne({ _id: event.context.user }).select(
    "+password",
  );

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "Utilisateur non trouvé",
    });
  }

  // CHECK PASSWORD
  const userPassword = user!.password;
  const isPasswordValid = await bcrypt.compare(
    body.data!.current_password,
    userPassword,
  );

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: "Mot de passe erroné",
    });
  }

  try {
    // INFO
    const userUpdated = await User.findOneAndUpdate(
      { _id: event.context.user },
      {
        username: body.data!.username,
        email: body.data!.email,
        ...(body.data!.password && { password: body.data!.password }),
      },
      {
        new: true,
        returnOriginal: false,
      },
    );

    if (!userUpdated) {
      throw createError({
        statusCode: 404,
        message: "Erreur lors de la mise à jour de l'utilisateur",
      });
    }

    return { ...userUpdated!.toObject() };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Mise à jour échouée",
    });
  }
});
