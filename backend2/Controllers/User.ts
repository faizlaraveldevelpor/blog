import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import cloudinary from "../Config/Coludinery";
import { user_model } from "../Modules/UserModel";
import { validate } from "email-validator";
import nodemailer from "nodemailer";

export const user_register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await user_model.findOne({ email });
    if (user) {
      res.status(201).json({ success: false, message: "enter unique email" });
      return;
    }
    let result: { secure_url?: string; public_id?: string } | undefined;
    if (req.file) {
      const url = `data:image/jpg;base64,${req.file.buffer.toString("base64")}`;
      result = await cloudinary.v2.uploader.upload(url);
    }
    const check_email = validate(email);
    if (!check_email) {
      res.status(200).json({ success: false, message: "enter correct email format" });
      return;
    }
    if (!name) {
      res.status(200).json({ success: false, message: "enter your name" });
      return;
    }
    if (!email) {
      res.status(200).json({ success: false, message: "enter your email" });
      return;
    }
    if (!password) {
      res.status(200).json({ success: false, message: "enter your password" });
      return;
    }
    const password_hash = await bcrypt.hash(password, 10);
    await user_model.create({
      name,
      email,
      password: password_hash,
      image: result?.secure_url,
      public_id: result?.public_id,
    });
    res.status(200).json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email) {
    res.status(200).json({ success: false, message: "enter your email" });
    return;
  }
  if (!password) {
    res.status(200).json({ success: false, message: "enter your password" });
    return;
  }
  const user = await user_model.findOne({ email }).populate({ path: "draft" });
  if (!user) {
    res.status(200).json({ success: false, message: "enter your correct email" });
    return;
  }
  const verify_password = await bcrypt.compare(password, user.password);
  if (!verify_password) {
    res.status(200).json({ success: false, message: "enter your correct Password" });
    return;
  }
  const Token = JWT.sign({ id: user._id }, process.env.TOKEN!, { expiresIn: "1d" });
  const user_data = {
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id,
    draft: user.draft,
    image: user.image,
  };
  res
    .cookie("Token", Token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: "user login successfully", user_data });
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.cookie("Token", "").status(200).json({ success: true, message: "logout successfully" });
};

export const profile_update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const avtar = req.file;
    const login_user = req.user!;
    const check_email = validate(email);
    const find_user = await user_model.findById(login_user);
    const public_id = find_user?.public_id;
    if (avtar) {
      if (public_id) {
        await cloudinary.v2.uploader.destroy(public_id);
      }
      const url = `data:image/jpg;base64,${avtar.buffer.toString("base64")}`;
      const rsult = await cloudinary.v2.uploader.upload(url);
      await user_model.findByIdAndUpdate(login_user, {
        image: rsult.secure_url,
        public_id: rsult.public_id,
      });
    }
    if (password) {
      const hash_password = await bcrypt.hash(password, 10);
      await user_model.findByIdAndUpdate(login_user, { password: hash_password });
    }
    if (name) {
      await user_model.findByIdAndUpdate(login_user, { name });
    }
    if (email) {
      if (!check_email) {
        res.status(401).json({ success: false, message: "enter correct email format" });
        return;
      }
      await user_model.findByIdAndUpdate(login_user, { email });
    }
    res.status(200).json({ success: true, message: "profile updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const forget_passwword = async (req: Request, res: Response): Promise<void> => {
  const find_user = await user_model.findOne({ email: req.params.email });
  if (find_user == null) {
    res.status(200).json({ success: false, message: "user not found" });
    return;
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "faizansari2025@gmail.com",
      pass: "qcse mhre yzvr vghe",
    },
  });
  const code = Math.floor(Math.random() * 10000);
  await transporter
    .sendMail({
      from: "faizansari2025@gmail.com",
      to: req.params.email,
      text: code.toString(),
      subject: "this is test email",
    })
    .catch(() => console.log("error"));
  await user_model.findOneAndUpdate(
    { email: req.params.email },
    { otp: code },
    { new: true }
  );
  res.status(200).json({ success: true, message: "otp send successfully" });
};

export const checkOtp = async (req: Request, res: Response): Promise<void> => {
  const check = await user_model.findOne({ otp: req.params.otp });
  if (!req.params.otp) {
    res.status(200).json({ success: false, message: "enter otp" });
    return;
  }
  if (!check) {
    res.status(200).json({ success: false, message: "enter correct otp" });
    return;
  }
  res.status(200).json({ success: true, message: "otp submit" });
};

export const create_newPassword = async (req: Request, res: Response): Promise<void> => {
  const { newPassword, confirmnewPassword, mail } = req.body;
  if (newPassword !== confirmnewPassword) {
    res
      .status(200)
      .json({ success: false, message: "new password not matched from confirm password" });
    return;
  }
  const hash = await bcrypt.hash(newPassword, 10);
  const docoment = await user_model.findOneAndUpdate(
    { email: mail },
    { password: hash },
    { new: true }
  );
  if (docoment) {
    (docoment as { otp: string }).otp = "";
    docoment.save({ validateBeforeSave: false });
  }
  res.status(200).json({ success: true, message: "password change successfully" });
};

export const change_role = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.query;
  if (!id) {
    res.status(200).json({ success: false, message: "add user id" });
    return;
  }
  await user_model.findByIdAndUpdate(id, { role });
  res.status(200).json({ success: true, message: "change role successfully" });
};

export const All_userget = async (req: Request, res: Response): Promise<void> => {
  const users = await user_model.find();
  res.status(200).json({ success: true, message: "user successfully", users });
};

export const delete_user = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(200).json({ success: false, message: "add the id" });
    return;
  }
  await user_model.findOneAndDelete({ _id: id });
  res.status(200).json({ success: true, message: "user delete successfully" });
};

export const single_user = async (req: Request, res: Response): Promise<void> => {
  const login_user = req.user;
  if (!login_user) {
    res.status(200).json({ success: false, message: "user not login" });
    return;
  }
  const user = await user_model.findById(login_user);
  res.status(200).json({ success: true, message: "user login data", user });
};
