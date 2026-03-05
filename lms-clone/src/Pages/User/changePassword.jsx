import { Link,useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePassword } from "../../Redux/Slices/AuthSlice";

export default function ChangePassword() {

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("All fields are required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    await dispatch(changePassword(passwordData));
    
    setPasswordData({
      oldPassword: "",
      newPassword: ""
    });

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
          
          <h2 className="text-2xl font-bold text-center mb-2">
            Change Password
          </h2>

          <p className="text-sm text-center opacity-90">
            Enter your old password and choose a new secure password
          </p>

          <form 
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              className="bg-transparent px-2 py-1 border rounded"
              value={passwordData.oldPassword}
            onChange={handleUserInput}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="bg-transparent px-2 py-1 border rounded"
              value={passwordData.newPassword}
              onChange={handleUserInput}
            />

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Update Password
            </button>
              <Link to="/user/profile">
                     <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                         <AiOutlineArrowLeft /> Go back to profile
                                    </p>
              </Link>
          </form>

          {/* <p className="text-sm text-center mt-4">
            Go back to{" "}
            <Link to="/user/profile" className="link text-accent cursor-pointer">
              Profile
            </Link>
          </p> */}

        </div>
      </div>
    </HomeLayout>
  );
}