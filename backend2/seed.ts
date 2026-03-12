/**
 * Seed script - Adds dummy categories and blogs to MongoDB
 * Run: npm run seed  or  tsx seed.ts
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { cetagory_model } from "./Modules/Cetagory";
import { blog_model } from "./Modules/BlogModel";
import { user_model } from "./Modules/UserModel";

dotenv.config({ path: "./Config/SC.env" });

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
];

const DUMMY_CATEGORIES = [
  { cetagory: "faiz", subCetagory: ["lifestyle", "tips"] },
  { cetagory: "fashion", subCetagory: ["trends", "style"] },
  { cetagory: "technology", subCetagory: ["coding", "ai"] },
  { cetagory: "sports", subCetagory: ["cricket", "football"] },
  { cetagory: "science", subCetagory: ["space", "health"] },
];

const DUMMY_BLOGS = [
  { title: "Getting Started with Modern Web Development", cetagory: "faiz", subcetagory: "lifestyle" },
  { title: "10 Tips for a Productive Morning Routine", cetagory: "faiz", subcetagory: "tips" },
  { title: "How to Build Healthy Habits That Stick", cetagory: "faiz", subcetagory: "tips" },
  { title: "Summer Fashion Trends 2024 You Must Try", cetagory: "fashion", subcetagory: "trends" },
  { title: "Minimalist Wardrobe Essentials", cetagory: "fashion", subcetagory: "style" },
  { title: "Sustainable Fashion: A Complete Guide", cetagory: "fashion", subcetagory: "trends" },
  { title: "Introduction to JavaScript ES6 Features", cetagory: "technology", subcetagory: "coding" },
  { title: "Understanding Artificial Intelligence in 2024", cetagory: "technology", subcetagory: "ai" },
  { title: "React Hooks: A Beginner's Guide", cetagory: "technology", subcetagory: "coding" },
  { title: "Cricket World Cup: Key Moments and Highlights", cetagory: "sports", subcetagory: "cricket" },
  { title: "Football Tactics: Pressing and Counter-Attack", cetagory: "sports", subcetagory: "football" },
  { title: "Upcoming Sports Events to Watch", cetagory: "sports", subcetagory: "cricket" },
  { title: "The Future of Space Exploration", cetagory: "science", subcetagory: "space" },
  { title: "Nutrition Basics: What Your Body Needs", cetagory: "science", subcetagory: "health" },
  { title: "Climate Change: Facts and Solutions", cetagory: "science", subcetagory: "space" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function getDummyContent(title: string): { type: string; data: { text: string } }[] {
  return [
    {
      type: "paragraph",
      data: {
        text: `This is a dummy blog post about "${title}". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    },
  ];
}

async function seed(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("DB connected successfully");

    let user = await user_model.findOne({ email: "dummy@blog.com" });
    if (!user) {
      const hashedPassword = await bcrypt.hash("Dummy123!", 10);
      user = await user_model.create({
        name: "Dummy Author",
        email: "dummy@blog.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Created dummy user:", user.email);
    } else {
      console.log("Using existing dummy user:", user.email);
    }

    for (const cat of DUMMY_CATEGORIES) {
      const exists = await cetagory_model.findOne({ cetagory: cat.cetagory });
      if (!exists) {
        await cetagory_model.create({
          cetagory: cat.cetagory,
          subCetagory: cat.subCetagory,
          blogs: [],
        });
        console.log("Created category:", cat.cetagory);
      } else {
        console.log("Category already exists:", cat.cetagory);
      }
    }

    const existingBlogs = await blog_model.countDocuments();
    if (existingBlogs >= 30) {
      console.log("Blogs already exist (" + existingBlogs + "), skipping blog creation.");
    } else {
      for (let i = 0; i < DUMMY_BLOGS.length; i++) {
        const b = DUMMY_BLOGS[i];
        const imgIndex = i % PLACEHOLDER_IMAGES.length;
        const slug = slugify(b.title) + "-" + Date.now();

        const blog = await blog_model.create({
          title: b.title,
          content: getDummyContent(b.title),
          image: [PLACEHOLDER_IMAGES[imgIndex]],
          public_id: [],
          user: user._id,
          cetagory: b.cetagory,
          subcetagory: b.subcetagory,
          likes: [],
          comments: [],
          metaTitle: b.title,
          metaDescription: b.title + " - Read more on Thoughtlab360",
          Slug: slug,
        });

        await cetagory_model.findOneAndUpdate(
          { cetagory: b.cetagory },
          { $push: { blogs: blog._id } },
          { new: true }
        );

        await user_model.findByIdAndUpdate(user._id, { $push: { blogs: blog._id } }, { new: true });
        console.log("Created blog:", b.title);
      }
    }

    console.log("\n✓ Seed completed successfully!");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("DB disconnected");
    process.exit(0);
  }
}

seed();
