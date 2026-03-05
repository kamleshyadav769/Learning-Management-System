import { Schema,model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema=new Schema({
   fullName:{
    type:String,
    required:[true,"Please provide your fullname"],
    minLength:[5,"Fullname must be at least 5 characters"],
    maxLength:[50,"Fullname must be less than 50 characters"],
    lowercase:true,
    trim:true
   },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true,
        lowercase:true,
       match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please provide a valid email address"]
   } ,
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minLength:[8,"Password must be at least 8 characters"],
       select: false
    },
    avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
        type:String
        }
    }, 
    subscription:{
        id:String,
        status:String,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    forgotPasswordToken : String, 
    forgotPasswordTokenExpire : Date
},{
    timestamps:true
});

//logic for hashing password before saving to database
userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        console.log(" user Password is not modified hence no need to hash the user password again");
      return ;
    }
    
    this.password=await bcrypt.hash(this.password,10);
    console.log("Password hashed successfully");
    
});

//logic for different methods like comparing password, generating token etc

//method to generate JWT token for user
userSchema.methods={
    generateJWTToken: async function(){
        return await jwt.sign({id : this._id, email:this.email, subscription: this.subscription, role : this.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRY}
        );
    },
//method to compare password for login
  comparePassword:async function(PlainTextPassword){
        return await bcrypt.compare(PlainTextPassword,this.password);
    },
     // This will generate a token for password reset
  generatePasswordResetToken: async function () {
    // creating a random token using node's built-in crypto module
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Adding forgot password token expiry to 15 minutes
    this.forgotPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },

}
const User=model("User",userSchema);
export default User;