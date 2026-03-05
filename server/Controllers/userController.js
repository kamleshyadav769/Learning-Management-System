
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import crypto from 'crypto';

import AppError from "../utils/AppError.js";
import User from "../models/userModel.js";
import sendEmail from '../utils/sendEmail.js';

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
 
};

     const register = async (req, res,next) => {
  // Destructuring the necessary data from req object
  const { fullName, email, password } = req.body;
  console.log(req.body);

  // Check if the data is there or not, if not throw error message
  if (!fullName || !email || !password) {
    return next(new AppError('All fields are required', 400));
  }

  // Check if the user exists with the provided email
  const userExists = await User.findOne({ email });

  // If user exists send the reponse
   if (userExists) {
    return next(new AppError('Email already exists', 409));
   }
const user = await User.create({
    fullName,
    email,
    password,
    avatar:{
      public_id : email,
      secure_url :  'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
    }
    });

   
     // If user not exist send message response
  if (!user) {
    return next(
      new AppError('User registration failed, please try again later', 400)
    );
  }

//FILE UPLOAD LOGIC WILL COME HERE IN FUTURE
 // Run only if user sends a file
  if (req.file) {
    console.log('File received:', req.file);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'uploads', // Save files in a folder named uploads
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });
     // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

          await user.save();  // ⭐ THIS WAS MISSING  (this  save image url and public id in database)

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }

}



    // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

   // Generating a JWT token
  const token = await user.generateJWTToken();



   // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOptions);

 // If all good send the response to the frontend
  res.status(201).json({
    success: true,
    message: 'User registered  successfully',
    user,
  });
};

    


const login= async (req,res,next)=>{
  try{
  const {email,password}=req.body;
  if(!email || !password){
    return next(new AppError('Please provide email and password',400));
  }
  const user=await User.findOne({email}).select('+password');
  if(!user||!( await user.comparePassword(password))){
    return next(new AppError('Invalid email or password',401));
  }

  const token=await user.generateJWTToken();
  user.password=undefined;
  res.cookie('token', token, cookieOptions);

  res.status(200).json({
    success:true,
    message:'User logged in successfully',
    user
  });
  }catch(e){
    return next(new AppError(e.message,500));
  }
  

};
const logout= (req,res,next)=>{
  console.log("Logging out user");
  try{
  res.cookie('token',null,{
    secure:true,
    maxAge:0,
    httpOnly:true
  });


  res.status(200).json({
    success:true,
    message:'User logged out successfully'

  })
  } catch (error) {
    return next(new AppError(e.message, 500));
  }; 

};
const getProfile= async(req,res,next)=>{
  try{
  const userId=req.user.id;
  const user= await User.findById(userId);

   res.status(200).json({
    success:true,
    message:'User details',
    user

  })
  }catch(e){
return next(new AppError(e.message,500));
  }

};


const forgotPassword=async(req,res,next)=>{
  const {email}=req.body;

  if(!email){
     return next(new AppError('Email is  required',400));
  }

  const user= await User.findOne({email});
   if(!user){
     return next(new AppError('Email not registered',400));
  }

  const resetToken =await user.generatePasswordResetToken(); 

  await user.save();
  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  console.log("Reset password URL:", resetPasswordURL);
   // We here need to send an email to the user with the token
  const subject = 'Reset Password';
  const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

  try{
    await sendEmail(email,subject,message);
    res.status(200).json({
      success:true,
      message:`Reset password token has been sent to ${email} successfully`
    })
    
  }catch(e){
//console.log("Error in sending email",e);
user.forgotPasswordToken=undefined;
user.forgotPasswordTokenExpire=undefined;
await user.save();
    return next(new AppError(e.message,500));
  }
}

const resetPassword=async(req,res,next)=>{
  const {resetToken}=req.params;
  const {password}=req.body;

  const forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');

  const user= await User.findOne({
    forgotPasswordToken,
    forgotPasswordTokenExpire:{$gt:Date.now()}
  });
  if(!user){
    return next(new AppError('Invalid or expired token',400));
  }
  user.password=password;
  user.forgotPasswordToken=undefined;
  user.forgotPasswordTokenExpire=undefined;
  await user.save();

  res.status(200).json({
    success:true,
    message:'Password reset successfully'
  })
}

const changePassword=async(req,res,next)=>{
  const {oldPassword,newPassword}=req.body;
  const{id}=req.user;
  if(!oldPassword || !newPassword){

    return next(new AppError('All fields are mandatory',400));
  }
  const user=await User.findById(id).select('+password');
  if(!user){
    return next(new AppError('User does not exist',404));
  }
   const isPasswordValid=await user.comparePassword(oldPassword);
  if(!isPasswordValid){
    return next(new AppError('Old password is invalid',400));
  }
 
  user.password=newPassword;
  await user.save();
  
  //user.password=undefined;// This is to ensure that the password is not sent in the response but since we are not sending user details in response here so it is not necessary to set password to undefined
  res.status(200).json({
    success:true,
    message:'Password changed successfully'
  })
}

const updateUser=async(req,res,next)=>{
  const {fullName}=req.body;
  const id=req.user.id;
 
  const user=await User.findById(id);
  if(!user){
    return next(new AppError('User does not exist',404));
  }

  if(fullName){
    user.fullName=fullName;
    await user.save();
  }

  if(req.file){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
     try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'uploads', // Save files in a folder named uploads
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });
     // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

      await user.save();  // ⭐ THIS WAS MISSING  (this  save image url and public id in database)

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }

  }



  res.status(200).json({
    success:true,
    message:'User details updated successfully',
    user
  })
}

export {register,login,logout,getProfile,resetPassword,forgotPassword,changePassword,updateUser};