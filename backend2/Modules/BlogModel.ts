import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    content: { type: Array },
    image: [{ type: String }],
    public_id: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    cetagory: { type: String },
    subcetagory: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    Slug: { type: String },
  },
  { timestamps: true }
);

export const blog_model = mongoose.model("blog", blogSchema);
