import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dg7nqp6lp",
  api_key: process.env.CLOUDINARY_API_KEY || "792328381361444",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dwZtD-A67__Aib7ok4UE3VK4AM0",
});

export default cloudinary;
