import mongoose from "mongoose";

const disclamerSchema = new mongoose.Schema({
  content: { type: Array },
});

export const Disclamer_model = mongoose.model("Disclamer", disclamerSchema);
