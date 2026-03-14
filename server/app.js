
import express from "express";
import cors from "cors";
import cookieParser  from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./Router/userRoutes.js";
import courseRoutes from "./Router/courseRoutes.js";
 import errorMiddleware from "./middlewares/errorMiddleware.js";
import paymentRoutes from "./Router/paymentRoutes.js";

 const app=express();

 
app.use(cors({
      origin:process.env.FRONTEND_URL,
      credentials:true
}));
 app.use(express.json());  // convert incoming request from browser into json formate (we know incoming request from browser is in string format) 
//console.log(process.env.FRONTEND_URL);

app.use(express.urlencoded({extended:true})); // {resetpassword function ke liye} app.use(express.urlencoded({extended:true})); is a middleware in Express.js just like express.json() that parses incoming request bodies. However, it specifically handles URL-encoded data, which is typically sent from HTML forms. When you set extended: true, it allows for rich objects and arrays to be encoded into the URL-encoded format, using the qs library. If you set extended: false, it uses the querystring library, which does not support nested objects. In the context of a reset password function, if you're expecting to receive form data (like a new password), using express.urlencoded() would allow you to easily access that data in req.body.


 app.use(cookieParser()); // cookieParser() is a middleware function in Express.js that parses cookies attached to the client request object. It populates the req.cookies property with an object containing the cookies sent by the client. This allows you to easily access and manipulate cookies in your Express application.
app.use(morgan("dev"));// morgan("dev") is a middleware function in Express.js that logs HTTP requests to the console. The "dev" format provides a concise output colored by response status for development use. It includes the HTTP method, URL, status code, response time, and content length of the response. This helps developers monitor and debug their applications by providing insights into incoming requests and their corresponding responses.

 app.use("/api/v1/user",userRoutes);
 app.use("/api/v1/courses",courseRoutes);
 app.use("/api/v1/payments",paymentRoutes);

 app.use((req,res)=>{
    res.status(404).send('OOPS! 404 page not found');
 });
 app.use(errorMiddleware);

 export default app;