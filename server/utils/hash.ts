import bcrypt from "bcryptjs";

export async function generateHash(data: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedData = bcrypt.hash(data, salt);

  return hashedData;
}
