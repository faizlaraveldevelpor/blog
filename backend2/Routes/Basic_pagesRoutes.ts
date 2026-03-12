import express from "express";
import multer from "multer";
import {
  Disclamer,
  get_Disclamer,
  getAbout_data,
  getprivacy_policy,
  term_create,
  termsget,
  update_About,
  update_privacy_policy,
} from "../Controllers/About";
import Auth, { Admin_check } from "../Middlewares/Authmiddleware";

export const Basicpages_routes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

Basicpages_routes.put("/About", upload.array("images"), Auth, Admin_check, update_About);
Basicpages_routes.put("/privacy", upload.array("images"), Auth, Admin_check, update_privacy_policy);
Basicpages_routes.put("/Disclamer", upload.array("images"), Auth, Admin_check, Disclamer);
Basicpages_routes.put("/terms", upload.array("images"), Auth, Admin_check, term_create);
Basicpages_routes.get("/get/term", termsget);
Basicpages_routes.get("/get/About", getAbout_data);
Basicpages_routes.get("/get/Disclamer", get_Disclamer);
Basicpages_routes.get("/get/privacy", getprivacy_policy);
