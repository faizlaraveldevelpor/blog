import mongoose from "mongoose";

const termsSchema = new mongoose.Schema({
  content: { type: Array },
});

export const Term_Conditions = mongoose.model("terms", termsSchema);
