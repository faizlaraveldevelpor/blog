import type { Request, Response } from "express";
import { cetagory_model } from "../Modules/Cetagory";

export const create_cetagory = async (req: Request, res: Response): Promise<void> => {
  const { cetagory } = req.body;
  if (!cetagory) {
    res.status(200).json({ success: false, message: "enter your cetagory" });
    return;
  }
  const find = await cetagory_model.findOne({ cetagory });
  if (find) {
    res.status(400).json({ success: false, message: "this cetagory is already exist" });
    return;
  }
  await cetagory_model.create({ cetagory });
  res.status(200).json({ success: true, message: "cetagory created successfully" });
};

export const get_cetagory = async (req: Request, res: Response): Promise<void> => {
  const getCetagory = await cetagory_model.find().populate({ path: "blogs" });
  res.status(200).json({ success: true, message: "cetagory get successfully", getCetagory });
};

export const delete_cetagory = async (req: Request, res: Response): Promise<void> => {
  const { cetagory } = req.params;
  if (!cetagory) {
    res.status(400).json({ success: true, message: "enter your cetagory" });
    return;
  }
  await cetagory_model.deleteOne({ cetagory });
  res.status(200).json({ success: true, message: "cetagory deleted successfully" });
};

export const delete_subcetagory = async (req: Request, res: Response): Promise<void> => {
  const { cetagory } = req.params;
  const data = JSON.parse(cetagory) as { cetagory: string; subCetagory: string };
  if (!cetagory) {
    res.status(400).json({ success: true, message: "enter your cetagory" });
    return;
  }
  await cetagory_model.findOneAndUpdate(
    { cetagory: data.cetagory },
    { $pull: { subCetagory: data.subCetagory } },
    { new: true }
  );
  res.status(200).json({ success: true, message: "cetagory deleted successfully" });
};

export const update_cetagory = async (req: Request, res: Response): Promise<void> => {
  const { cetagory } = req.body;
  if (!cetagory) {
    res.status(400).json({ success: true, message: "enter your cetagory" });
    return;
  }
  await cetagory_model.findOneAndUpdate({ cetagory }, { cetagory }, { new: true });
  res.status(200).json({ success: true, message: "cetagory updated successfully" });
};

export const update_subcetagory = async (req: Request, res: Response): Promise<void> => {
  const { subCetagory, cetagory } = req.body;
  if (!subCetagory) {
    res.status(400).json({ success: true, message: "enter your subcetagory" });
    return;
  }
  if (!cetagory) {
    res.status(400).json({ success: true, message: "enter your cetagory" });
    return;
  }
  await cetagory_model.findOneAndUpdate(
    { cetagory },
    { subCetagory },
    { new: true }
  );
  res.status(200).json({ success: true, message: "subcetagory updated successfully" });
};

export const create_subcetagory = async (req: Request, res: Response): Promise<void> => {
  const { subCetagory, cetagory } = req.body;
  if (!subCetagory) {
    res.status(400).json({ success: true, message: "enter your subcetagory" });
    return;
  }
  if (!cetagory) {
    res.status(400).json({ success: true, message: "enter your cetagory" });
    return;
  }
  const find = await cetagory_model.findOne({ cetagory });
  await cetagory_model.findOneAndUpdate(
    { cetagory: find?.cetagory },
    { $push: { subCetagory } },
    { new: true }
  );
  res.status(200).json({ success: true, message: "subcetagory created successfully" });
};

export const one_cetagory_get = async (req: Request, res: Response): Promise<void> => {
  const { cetagory } = req.body;
  if (!cetagory) {
    res.status(400).json({ success: false, message: "enter your cetagory" });
    return;
  }
  const find_data = await cetagory_model.find({ cetagory });
  res.status(200).json({ success: true, message: "single comment get successfully", find_data });
};

export const get_data_from_cetagory = async (req: Request, res: Response): Promise<void> => {
  let { cetagory_name } = req.body;
  if (!cetagory_name) {
    cetagory_name = ["fashion", "sports"];
  }
  const fin_data = await cetagory_model.find().populate({ path: "blogs" });
  res.status(200).json({ success: true, message: "get data", fin_data });
};
