import { config } from "dotenv";
config();
import app from"./app.js";
import { v2 } from "cloudinary";
import connectionToDB from "./Config/dbConnection.js";
import Razorpay from "razorpay";

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Plan ID from env:", process.env.RAZORPAY_PLAN_ID);
console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
// Razorpay configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const PORT=process.env.PORT||5000;
app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`app is running on at http://localhost:${PORT}`);
});