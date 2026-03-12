import mongoose from "mongoose";

const cetagorySchema = new mongoose.Schema({
  cetagory: { type: String, required: true, unique: true },
  subCetagory: [{ type: String, required: true }],
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog" }],
});

export const cetagory_model = mongoose.model("cetagory", cetagorySchema);
