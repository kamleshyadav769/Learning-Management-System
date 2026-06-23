import { Link } from "react-router-dom";

import HomePageImage from "../assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    return (
      <HomeLayout>
            {/* <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]  "> */}
            <div className="pt-10 text-white flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-4 md:px-10 lg:px-16 min-h-[90vh]">
                {/* <div className="w-1/2 space-y-6"> */}
                <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                    {/* <h1 className="text-5xl font-semibold"> */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold">
                            Online Courses
                        </span>
                    </h1>
                    {/* <p className="text-xl text-gray-200"> */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    {/* <div className="space-x-6"> */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link> 

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* <div className="w-1/2 flex items-center justify-center"> */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                   <img alt="homepage image" src={HomePageImage}
                        className="w-full max-w-md lg:max-w-xl" 
                        // classname is added to make responsive iske pehle nhi tha 
                        />  
                </div>

            </div>
        </HomeLayout>
    );  
}

export default HomePage;