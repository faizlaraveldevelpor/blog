import mongoose from "mongoose";

export const connect_DB = async (): Promise<void> => {
  await mongoose.connect(process.env.DB_URL!);
  console.log("DB CONNECT HOO GAYA HAI");
};
