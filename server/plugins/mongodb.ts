import mongoose from "mongoose";
const config = useRuntimeConfig();

export default defineNitroPlugin(async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("✔ Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
});
