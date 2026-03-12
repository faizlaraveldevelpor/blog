import express from "express";
import multer from "multer";
import Auth, { Admin_check } from "../Middlewares/Authmiddleware";
import {
  create_blog,
  delete_blog,
  draft_blog,
  get_draft,
  get_single_blog,
  getblog,
  like,
  premium_blogs,
  search,
  update_blog,
} from "../Controllers/Blog";
import { create_comment, delete_comment } from "../Controllers/Comment";
import { get_data_from_cetagory } from "../Controllers/Cetagory";

const blog_routes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

blog_routes.post(
  "/create",
  (req, res, next) => {
    upload.fields([{ name: "images" }, { name: "image" }])(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        res.status(400).json({
          success: false,
          message:
            err.code === "LIMIT_FILE_SIZE" ? "File size too large (max 15MB)" : "Upload error",
        });
        return;
      }
      next();
    });
  },
  Auth,
  Admin_check,
  create_blog
);
blog_routes.put(
  "/update/:id",
  upload.fields([{ name: "images" }, { name: "image" }]),
  Auth,
  Admin_check,
  update_blog
);
blog_routes.delete("/delete/:id", Auth, Admin_check, delete_blog);
blog_routes.get("/single/blog/:id", get_single_blog);
blog_routes.put("/like/:id", Auth, like);
blog_routes.get("/blogs/:current_page", getblog);
blog_routes.post("/blogs/premium/:current_page", premium_blogs);
blog_routes.post("/get/blogs/cetagory", upload.array("cetagory_name"), get_data_from_cetagory);
blog_routes.post("/create/comments/:id", Auth, create_comment);
blog_routes.put("/blog/draft/:id", Auth, draft_blog);
blog_routes.get("/search/:title", search);
blog_routes.delete("/delete/comment/:id", delete_comment);
blog_routes.get("/get_draft/:id", get_draft);

export default blog_routes;
