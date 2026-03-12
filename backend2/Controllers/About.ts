import type { Request, Response } from "express";
import cloudinary from "../Config/Coludinery";
import { AboutModel } from "../Modules/AboutModel";
import { Disclamer_model } from "../Modules/Create_Disclamer";
import { Privacy_policy_model } from "../Modules/Privacy_policy_model";
import { Term_Conditions } from "../Modules/Term_conditions";

type ContentBlock = { type: string; data?: { file?: { public_id?: string; url?: string } } };

async function updateContentWithImages(
  req: Request,
  Model: typeof AboutModel | typeof Privacy_policy_model | typeof Disclamer_model | typeof Term_Conditions,
  res: Response,
  successMessage: string
): Promise<void> {
  try {
    let content: { blocks?: ContentBlock[] };
    if (req.body.content && req.body.content !== "undefined") {
      content = JSON.parse(req.body.content);
    } else {
      res.status(400).json({ success: false, message: "content is required" });
      return;
    }
    const files = req.files as Express.Multer.File[] | undefined;
    const find = await Model.find();
    if (find.length !== 0 && find[0].content?.[0]?.blocks) {
      for (const element of find[0].content[0].blocks) {
        try {
          if (element.type === "Image" && element.data?.file?.public_id) {
            await cloudinary.v2.uploader.destroy(element.data.file.public_id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    let image_index = 0;
    if (files && files.length !== 0 && content?.blocks) {
      for (let i = 0; i < content.blocks.length; i++) {
        if (content.blocks[i].type === "Image" && files[image_index]) {
          const url = `data:image/jpg;base64,${files[image_index].buffer.toString("base64")}`;
          const result = await cloudinary.v2.uploader.upload(url);
          if (!content.blocks[i].data) content.blocks[i].data = {};
          content.blocks[i].data!.file = {
            url: result.secure_url,
            public_id: result.public_id,
          };
          image_index++;
        }
      }
    }
    const findDoc = await Model.find();
    if (findDoc.length === 0) {
      res.status(400).json({ success: false, message: "No document to update" });
      return;
    }
    await Model.findByIdAndUpdate(findDoc[0]._id, { content }, { new: true });
    res.status(200).json({ success: true, message: successMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
}

export const update_About = async (req: Request, res: Response): Promise<void> => {
  await updateContentWithImages(req, AboutModel, res, "created About page");
};

export const getAbout_data = async (req: Request, res: Response): Promise<void> => {
  const find = await AboutModel.find();
  res.status(200).json({ success: true, message: "data get", find });
};

export const update_privacy_policy = async (req: Request, res: Response): Promise<void> => {
  await updateContentWithImages(req, Privacy_policy_model, res, "created Privacy policy");
};

export const getprivacy_policy = async (req: Request, res: Response): Promise<void> => {
  const find = await Privacy_policy_model.find();
  res.status(200).json({ success: true, message: "data get", find });
};

export const Disclamer = async (req: Request, res: Response): Promise<void> => {
  await updateContentWithImages(req, Disclamer_model, res, "created Disclamer");
};

export const get_Disclamer = async (req: Request, res: Response): Promise<void> => {
  const find = await Disclamer_model.find();
  res.status(200).json({ success: true, message: "data get disclamer", find });
};

export const term_create = async (req: Request, res: Response): Promise<void> => {
  await updateContentWithImages(req, Term_Conditions, res, "created Terms and conditions");
};

export const termsget = async (req: Request, res: Response): Promise<void> => {
  const find = await Term_Conditions.find();
  res.status(200).json({ success: true, message: "data get terms", find });
};
