import type { Request, Response } from "express";
import sharp from "sharp";
import { blog_model } from "../Modules/BlogModel";
import { user_model } from "../Modules/UserModel";
import cloudinary from "../Config/Coludinery";
import { cetagory_model } from "../Modules/Cetagory";

type MulterFiles = { image?: Express.Multer.File[]; images?: Express.Multer.File[] };

export const create_blog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, cetagory, subcetagory, metaTitle, metaDescription, metaSlug } =
      req.body;
    const files = req.files as MulterFiles | undefined;
    if (!files || !files.image) {
      res.status(400).json({ success: false, message: "enter your image" });
      return;
    }
    if (!req.body.content) {
      res.status(400).json({ success: false, message: "content is required" });
      return;
    }
    let data: { blocks?: { type: string; data: { file?: { url: string; public_id: string } } }[] };
    try {
      data = JSON.parse(req.body.content);
    } catch {
      res.status(400).json({ success: false, message: "Invalid content format" });
      return;
    }
    if (!title) {
      res.status(400).json({ success: false, message: "please enter all the fields" });
      return;
    }
    if (!cetagory) {
      res.status(400).json({ success: false, message: "please enter all the cetagory" });
      return;
    }
    if (!subcetagory) {
      res.status(400).json({ success: false, message: "please enter all the subcetagory" });
      return;
    }
    if (!data.blocks || data.blocks.length === 0) {
      res.status(400).json({ success: false, message: "enter your blog content" });
      return;
    }
    let image_index = 0;
    const contentImages = files.images || [];
    for (let i = 0; i < data.blocks.length; i++) {
      if (data.blocks[i].type === "Image") {
        if (!contentImages[image_index]) {
          res.status(400).json({ success: false, message: "Missing image for content block" });
          return;
        }
        const compress = await sharp(contentImages[image_index].buffer)
          .webp({ quality: 80 })
          .toBuffer();
        const urls = `data:image/jpg;base64,${compress.toString("base64")}`;
        const result = await cloudinary.v2.uploader.upload(urls);
        data.blocks[i].data.file = { url: result.secure_url, public_id: result.public_id };
        image_index++;
      }
    }
    const compress = await sharp(files.image[0].buffer).webp({ quality: 80 }).toBuffer();
    const single_image_result = await cloudinary.v2.uploader.upload(
      `data:image/jpg;base64,${compress.toString("base64")}`
    );
    const create_blog_result = await blog_model.create({
      title,
      content: data,
      user: req.user,
      image: [single_image_result.secure_url],
      public_id: [single_image_result.public_id],
      cetagory,
      subcetagory,
      metaDescription,
      metaTitle,
      Slug: metaSlug,
    });
    await cetagory_model.findOneAndUpdate(
      { cetagory },
      { $push: { blogs: create_blog_result._id } },
      { new: true }
    );
    await user_model.findByIdAndUpdate(req.user, { $push: { blogs: create_blog_result._id } });
    res.status(200).json({
      success: true,
      message: "blog created successfully",
      create_blog: create_blog_result,
    });
  } catch (eror) {
    console.log(eror);
    res.status(400).json({
      success: false,
      message: (eror as Error)?.message || "Blog create failed",
    });
  }
};

export const getblog = async (req: Request, res: Response): Promise<void> => {
  let { current_page } = req.params;
  if (!current_page) current_page = "1";
  const perpage_result = 10 * Number(current_page);
  const get_blog = await blog_model
    .find()
    .sort({ createdAt: -1 })
    .limit(perpage_result)
    .populate({ path: "comments", populate: { path: "user" } });
  res.status(200).json({ success: true, message: "blog get successfully", get_blog });
};

export const update_blog = async (req: Request, res: Response): Promise<void> => {
  try {
    const content = JSON.parse(req.body.content);
    const { title, cetagory, subcetagory, public_id, metaTitle, metaDescription, metaSlug } =
      req.body;
    const { id } = req.params;
    const find_blog = await blog_model.findById(id);
    const filter =
      find_blog?.content?.[0]?.blocks?.filter((d: { type: string }) => d.type === "Image") || [];
    let string: string | null = null;
    if (public_id) string = public_id.toString();
    const filter_2 = filter.filter(
      (d: { data: { file: { public_id: string } } }) => d.data?.file?.public_id !== string
    );
    for (const element of filter_2) {
      try {
        await cloudinary.v2.uploader.destroy(element.data.file.public_id);
      } catch (error) {
        console.log(error);
      }
    }
    const files = req.files as MulterFiles | undefined;
    if (files?.image?.length) {
      const find_blog2 = await blog_model.findById(id);
      if (find_blog2?.public_id?.[0])
        await cloudinary.v2.uploader.destroy(find_blog2.public_id[0]);
      const compress = await sharp(files.image[0].buffer).webp({ quality: 80 }).toBuffer();
      const img_url = `data:image/jpg;base64,${compress.toString("base64")}`;
      const add_image = await cloudinary.v2.uploader.upload(img_url);
      await blog_model.findByIdAndUpdate(id, {
        image: [add_image.secure_url],
        public_id: [add_image.public_id],
      });
    }
    await blog_model.findByIdAndUpdate(id, { title, cetagory, subcetagory });
    if (files?.images?.length && content?.blocks) {
      for (const element of content.blocks) {
        if (element.data?.file?.image) {
          for (const data of files.images) {
            try {
              const compress = await sharp(data.buffer).webp({ quality: 80 }).toBuffer();
              const img_url = `data:image/jpg;base64,${data.buffer.toString("base64")}`;
              const result = await cloudinary.v2.uploader.upload(img_url);
              element.data.file = { url: result.secure_url, public_id: result.public_id };
              await blog_model.findByIdAndUpdate(id, { content });
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
    if (metaDescription) await blog_model.findByIdAndUpdate(id, { metaDescription });
    if (metaSlug) await blog_model.findByIdAndUpdate(id, { Slug: metaSlug });
    if (metaTitle) await blog_model.findByIdAndUpdate(id, { metaTitle });
    await blog_model.findByIdAndUpdate(id, { content });
    res.status(200).json({ success: true, message: "blog updated" });
  } catch (error) {
    console.log(error);
  }
};

export const delete_blog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const get = await blog_model.findOne({ _id: id });
    if (!get) {
      res.status(400).json({ success: false, message: "blog not found" });
      return;
    }
    const pubId = Array.isArray(get.public_id) ? get.public_id[0] : get.public_id;
    if (pubId) await cloudinary.v2.uploader.destroy(pubId);
    if (get.content?.[0]?.blocks) {
      for (const data of get.content[0].blocks) {
        try {
          if (data.data?.file?.public_id) {
            await cloudinary.v2.uploader.destroy(data.data.file.public_id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (get.user?.toString() !== req.user?.toString()) {
      res.status(400).json({ success: false, message: "this is not your blog" });
      return;
    }
    await blog_model.findByIdAndDelete(id);
    await user_model.findByIdAndUpdate(req.user, { $pull: { blogs: id } });
    res.status(200).json({ success: true, message: "blog delete successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const get_single_blog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const blog_get = await blog_model
    .findById(id)
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });
  res.status(200).json({ success: true, message: "single blog get successfully", blog_get });
};

export const like = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const blog_find = await blog_model.findById(id);
  if (!blog_find || !req.user) return;
  const likes = (blog_find.likes || []).map((x) => x?.toString());
  if (likes.includes(req.user)) {
    await blog_model.findByIdAndUpdate(id, { $pull: { likes: req.user } }, { new: true });
    await user_model.findByIdAndUpdate(req.user, { $pull: { likes_blog: id } }, { new: true });
    res.status(200).json({ success: true, message: "dislike successfully" });
  } else {
    await blog_model.findByIdAndUpdate(id, { $push: { likes: req.user } }, { new: true });
    await user_model.findByIdAndUpdate(req.user, { $push: { likes_blog: id } }, { new: true });
    res.status(200).json({ success: true, message: "like successfully" });
  }
};

export const premium_blogs = async (req: Request, res: Response): Promise<void> => {
  let { current_page } = req.params;
  if (!current_page) current_page = "1";
  const perPage = 2;
  const skip = Number(current_page) * perPage - 1;
  let blogs = await blog_model.find().limit(2).skip(skip);
  if (blogs.length === 0) {
    blogs = await blog_model.find().limit(2);
  }
  res.status(200).json({ success: true, message: "premium blogs get successfully", blogs });
};

export const draft_blog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, message: "login first" });
    return;
  }
  const user_find = await user_model.findById(req.user);
  const draft = (user_find?.draft || []).map((d) => d?.toString());
  if (draft.includes(id)) {
    await user_model.findByIdAndUpdate(req.user, { $pull: { draft: id } }, { new: true });
    res.status(200).json({ success: true, message: "undraft successfully" });
  } else {
    await user_model.findByIdAndUpdate(req.user, { $push: { draft: id } }, { new: true });
    res.status(200).json({ success: true, message: "draft successfully" });
  }
};

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.params;
    const find_blog = await blog_model.find({
      title: { $regex: title, $options: "i" },
    });
    res.status(200).json({ success: true, message: "blog get", find_blog });
  } catch (error) {
    console.log(error);
  }
};

export const get_draft = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ success: false, message: "user not login" });
    return;
  }
  const find_draft = await user_model.findById(id).populate({ path: "draft" });
  res.status(200).json({
    success: true,
    message: "blog get successfully",
    find_draft: find_draft?.draft || [],
  });
}
