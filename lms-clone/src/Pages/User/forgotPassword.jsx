import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
 import toast from "react-hot-toast";
 import { useDispatch } from "react-redux";
  import { useState } from "react";
 import { forgotPassword } from "../../Redux/Slices/AuthSlice";


export default function ForgotPassword() {
 const [userEmail, setUserEmail] = useState({
       email:"",
        
     });

     const dispatch = useDispatch();
  function handleUserInput(e) {
        const {name, value} = e.target;
        setUserEmail({
            ...userEmail,
            [name]: value
        })
    }
    async function onFormSubmit(e) {
       e.preventDefault();
        console.log(userEmail);
         if(!userEmail.email) {
             toast.error("Email is required");
            return;
         }
await dispatch(forgotPassword({
    email: userEmail.email
}));
     }

  return (
    <HomeLayout>
    <div className="flex items-center justify-center h-[100vh]">
      <div  
  
      className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Forget Password
        </h2>

        <p className="text-sm text-center mb-6 opacity-90">
          Enter your registered email, we will send you a verification link
          on your registered email from which you can reset your password
        </p>

        <form 
          onSubmit={onFormSubmit}
        className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
             className="bg-transparent px-2 py-1 border"
              value={userEmail.email}
           onChange={handleUserInput}
           
          />

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Get Verification Link
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className='link text-accent cursor-pointer'>
            Login
          </Link>
        </p>
      </div>
    </div>
    </HomeLayout>
  );
}