import mongoose from "mongoose";

const privacySchema = new mongoose.Schema({
  content: { type: Array },
});

export const Privacy_policy_model = mongoose.model("privacy", privacySchema);
