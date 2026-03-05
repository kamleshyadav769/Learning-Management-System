import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const isLoggedIn=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new AppError('Unauthenticated,please login again',401))

    }

    const userDetails= await jwt.verify(token,process.env.JWT_SECRET);
       req.user=userDetails;
       next();
}

// Middleware to check if user is admin or not
 const authorizeRoles = (...roles) =>async (req, res, next) => {
 const CurrentUserRole=req.user.role;
    if (!roles.includes(CurrentUserRole)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  };

  const authorizeSubscribers = async (req, res, next) => {
    const subscription = req.user.subscription;
    const CurrentUserRole=req.user.role;

    if (CurrentUserRole !== 'ADMIN'&& subscription.status !== 'active') {
      return next(new AppError('You do not have permission to access this route', 403));
    }
   next();
  }
export {
    isLoggedIn,
    authorizeRoles,
    authorizeSubscribers
}
