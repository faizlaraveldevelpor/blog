import type { Request, Response } from "express";
import { blog_model } from "../Modules/BlogModel";
import { coment_model } from "../Modules/Comment";
import { user_model } from "../Modules/UserModel";

export const create_comment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    res.status(401).json({ success: false, message: "enter text" });
    return;
  }
  const create_coment = await coment_model.create({
    text,
    blog: id,
    user: req.user,
  });
  await blog_model.findByIdAndUpdate(id, { $push: { comments: create_coment._id } });
  await user_model.findByIdAndUpdate(req.user, { $push: { comments: create_coment._id } });
  res.status(200).json({ success: true, message: "comment created", create_coment });
};

export const delete_comment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { blog_id } = req.body;
  const deleted = await coment_model.findByIdAndDelete(id);
  await blog_model.findByIdAndUpdate(blog_id, { $pull: { comments: id } }, { new: true });
  await user_model.findByIdAndUpdate(req.user, { $pull: { comments: id } }, { new: true });
  res.status(200).json({ success: true, message: "comment deleted", delete_comment: deleted });
};
