import JWT from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { user_model } from "../Modules/UserModel";

const Auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.cookies?.Token) {
    res.status(400).json({ success: false, message: "please login first" });
    return;
  }
  try {
    const verify = JWT.verify(req.cookies.Token, process.env.TOKEN!) as { id: string };
    req.user = verify.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export const Admin_check = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const check = await user_model.findById(req.user);
  if (check?.role === "user") {
    res.status(200).json({ success: false, message: "you are not admin" });
    return;
  }
  next();
};

export default Auth;
