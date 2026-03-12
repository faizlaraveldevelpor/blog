import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  content: { type: Array },
});

export const AboutModel = mongoose.model("About", aboutSchema);
