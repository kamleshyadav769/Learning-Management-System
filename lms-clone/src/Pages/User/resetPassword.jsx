import { useState } from "react";
import { useDispatch } from "react-redux";
import {  Link,useParams } from "react-router-dom";//useParams,
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

export default function ResetPassword() {

  const { token } = useParams(); // get token from URL
  console.log("Token from URL:", token);
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!passwordData.password || !passwordData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (passwordData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await dispatch(resetPassword({
      token,
      password: passwordData.password
    }));

    setPasswordData({
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">

          <h2 className="text-2xl font-bold text-center">
            Reset Password
          </h2>

          <p className="text-sm text-center opacity-90">
            Enter your new password below
          </p>

          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              className="bg-transparent px-2 py-1 border rounded"
              value={passwordData.password}
              onChange={handleUserInput}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="bg-transparent px-2 py-1 border rounded"
              value={passwordData.confirmPassword}
              onChange={handleUserInput}
            />

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Reset Password
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Back to{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>

        </div>
      </div>
    </HomeLayout>
  );
}
