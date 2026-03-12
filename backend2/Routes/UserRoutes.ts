import express from "express";
import {
  user_register,
  loginUser,
  logoutUser,
  profile_update,
  forget_passwword,
  checkOtp,
  create_newPassword,
  change_role,
  All_userget,
  delete_user,
  single_user,
} from "../Controllers/User";
import multer from "multer";
import Auth from "../Middlewares/Authmiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const User_routes = express.Router();

User_routes.post("/resgister", upload.single("avtar"), user_register);
User_routes.post("/login", loginUser);
User_routes.post("/logout", logoutUser);
User_routes.post("/update/profile", Auth, upload.single("avtar"), profile_update);
User_routes.post("/forget/password/:email", forget_passwword);
User_routes.post("/check/otp/:otp", checkOtp);
User_routes.post("/create/new/password", create_newPassword);
User_routes.put("/user/role/:id", change_role);
User_routes.get("/users", All_userget);
User_routes.delete("/users/delete/:id", delete_user);
User_routes.get("/login/user", Auth, single_user);
