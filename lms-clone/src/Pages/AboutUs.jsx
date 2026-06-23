{/*import aboutMainImage from "../assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {

    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world. 
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.  
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            alt="about main image"
                            className="drop-shadow-2xl"
                            src={aboutMainImage}
                        />
                    </div>
                </div>

                <div className="carousel w-1/2 m-auto my-16">
                    {celebrities && celebrities.map(celebrity => (<CarouselSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.slideNumber} 
                                                                    totalSlides={celebrities.length}
                                                                    
                                                                />))}
                    
                </div>


            </div>
        </HomeLayout>  
    );
}   


export default AboutUs;
*/}

import apj from "../assets/Images/apj.png";
import billGates from "../assets/Images/billGates.png";
import einstein from "../assets/Images/einstein.png";
import nelsonMandela from "../assets/Images/nelsonMandela.png";
import steveJobs from "../assets/Images/steveJobs.png";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
     return (
        <HomeLayout>
            {/* <div className="pl-20 pt-20 flex flex-col text-white"> */}
             <div className="px-4 md:px-10 lg:px-20 pt-10 lg:pt-20 flex flex-col text-white">
                 {/* <div className="flex items-center gap-5 mx-10"> */}
                 <div className="flex flex-col lg:flex-row items-center gap-10 mx-4 md:mx-10">
                    {/* <section className="w-1/2 space-y-10"> */}
                     <section className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        {/* <h1 className="text-5xl text-yellow-500 font-semibold"> */}
                         <h1 className="text-3xl md:text-4xl lg:text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        {/* <p className="text-xl text-gray-200"> */}
                         <p className="text-base md:text-lg lg:text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world. 
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.  
                        </p>
                    </section>
                    {/* <div className="w-1/2"> */}
                     <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            alt="about main image"
                            // className="drop-shadow-2xl"
                             className="drop-shadow-2xl w-full max-w-md"
                            src={aboutMainImage}
                        />
                    </div>
            </div>
            {/* <div className="carousel m-auto w-1/2 my-16"> */}
                 <div className="carousel m-auto w-full lg:w-3/4 xl:w-1/2 my-16">
                  <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={nelsonMandela} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"Education is the most powerful tool you can use to change the world."}
                            </p>
                            <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide5" className="btn btn-circle">❮</a> 
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
                            <p className="text-xl text-gray-200">
                                {"Failure will never overtake me if my determination to succeed is strong enough."}
                            </p>
                            <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a> 
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={einstein} className="w-40 rounded-full border-2 border-gray-400" />
                            {/* <p className="text-xl text-gray-200"> */}
                             <p className="text-base md:text-lg lg:text-xl text-gray-200 text-center">
                                {"A person who never made a mistake never tried anything new."}
                            </p>
                            {/* <h3 className="text-2xl font-semibold"> */}
                             <h3 className="text-xl md:text-2xl font-semibold text-center">
                                Albert Einstein</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a> 
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={steveJobs} className="w-40 rounded-full border-2 border-gray-400" />
                            {/* <p className="text-xl text-gray-200"> */}
                             <p className="text-base md:text-lg lg:text-xl text-gray-200 text-center">
                                {"We don't get a chance to do that many things, and every one should be really excellent."}
                            </p>
                            {/* <h3 className="text-2xl font-semibold"> */}
                             <h3 className="text-xl md:text-2xl font-semibold text-center">
                                   Steve Jobs</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a> 
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide5" className="carousel-item relative w-full">
                         <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={billGates} className="w-40 rounded-full border-2 border-gray-400" />
                            {/* <p className="text-xl text-gray-200"> */}
                             <p className="text-base md:text-lg lg:text-xl text-gray-200 text-center">
                                {"Success is a lousy teacher. It seduces smart people into thinking they can’t lose."}
                            </p>
                            {/* <h3 className="text-2xl font-semibold"> */}
                             <h3 className="text-xl md:text-2xl font-semibold text-center">
                             Bill Gates</h3>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a> 
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
       
             </HomeLayout>  
            )   
                    }
export default AboutUs;
        