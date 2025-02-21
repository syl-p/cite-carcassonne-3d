import { User } from "~/server/models/User.model";
import protectRoute from "~/server/protectRoute";

export default defineEventHandler(async (event) => {
  await protectRoute(event);

  try {
    const deletedUser = await User.findByIdAndDelete(event.context.user);
    if (!deletedUser) {
      throw createError({ statusCode: 404, message: "Utilisateur non trouvé" });
    }

    return { message: "Compte supprimé avec succès" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Erreur lors de la suppression",
    });
  }
});
