import React from "react";
import { AiOutlineCompass } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import { GiBrain } from "react-icons/gi";
import { PiCertificate } from "react-icons/pi";
import { BsArrowRight } from "react-icons/bs";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/CTAbutton";
import Banner from "../assets/Images/Banner.png";
import "../App.css";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaGraduationCap } from "react-icons/fa";
import { SlDiamond } from "react-icons/sl";
import { BsFileCodeFill } from "react-icons/bs";
import jobInDemand from "../assets/Images/jobInDemand.png";
import progress from "../assets/Images/Know_your_progress.png";
import compare from "../assets/Images/Compare_with_others.png";
import lessons from "../assets/Images/Plan_your_lessons.png";
import instructor from "../assets/Images/instructor.png";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import { useSelector } from "react-redux";

const Home = () => {
    const { user } = useSelector((state) => state.profile);
    console.log("Printing the user", user);

    return (
        <div>
            {/* section 1 */}
            <div className="flex flex-col gap-8 items-center w-[100%] bg-[#000814] font-inter">
                <div className="flex flex-col items-center gap-5">
                    {/* for laptops */}
                    <div className="hidden relative md:flex lg:flex-row lg:gap-2 w-[86%] md:w-fit items-center text-white text-2xl md:text-3xl font-semibold mt-10">
                        Invest in Your Professional Goals with
                        <div className="hidden md:inline">
                            <HighlightText text={"StudySkill"} />
                        </div>
                    </div>
                    {/* for mobile */}
                    <div className="text-2xl text-richblack-5 font-semibold md:hidden flex flex-col items-center mt-10">
                        <p>Invest in Your Professional</p>
                        <div className="flex gap-1">
                            <p>Goals with</p>
                            <HighlightText text={"StudySkill"} />
                        </div>
                    </div>
                    <p className="w-[90%] lg:w-[75%] text-center text-pure-greys-300 text-sm font-semibold">
                        Get access to courses, Projects, Specializations, and Professional
                        Certificates on StudySkill, taught by top instructors from leading
                        universities and companies.
                    </p>
                </div>

                <div className="flex gap-6">
                    <CTAbutton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAbutton>
                    <CTAbutton active={false} linkto={"/login"}>
                        Book a demo
                    </CTAbutton>
                </div>

                <div className="shadow-[0px_0px_30px_0px_#1FA2FF] w-[310px] md:w-[420px] lg:w-[590px]">
                    <div>
                        <img
                            src={Banner}
                            alt="Banner"
                            className="shadow-[9px_9px_0px_0px_#fff] lg:shadow-[11px_11px_0px_0px_#fff] object-contain w-[100%] rounded-sm"
                        />
                    </div>
                </div>

                {/* code section 1 */}
                <div className="w-[100%]">
                    <CodeBlocks
                        heading1={"Unlock your"}
                        hgltHeading={"Coding potential"}
                        heading2={"with our online courses."}
                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        cta1={"Try it Yourself"}
                        cta2={"Learn More"}
                        codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width">\n<meta http-equiv="X-UA-Compatible" content="ie=edge">\n<title>HTML 5 Boilerplate</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<script src="index.js"></script>\n</body>\n</html>`}
                    />
                </div>

                <ExploreMore />
            </div>

            {/* section 2 */}
            <div className="w-[100%] bg-[#F9F9F9] flex flex-col">
                <div className="homepageImage h-[100px] md:h-[350px] flex flex-col items-center">
                    <div className="hidden md:flex gap-4 mt-[230px]">
                        <CTAbutton active={true} linkto={"/catalog/python"}>
                            <div className="flex gap-2 items-center">
                                Explore Full Catalog
                                <BsArrowRight />
                            </div>
                        </CTAbutton>
                        <CTAbutton active={false}>Learn More</CTAbutton>
                    </div>
                </div>

                <div className="w-[100%] flex flex-col gap-10 items-center">
                    <div className="w-[80%] flex flex-col md:flex-row gap-7 md:gap-1 justify-center mt-10">
                        <div className="w-[100%] md:w-[45%] text-richblack-800 text-[23px] md:text-3xl font-semibold">
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."} />
                        </div>

                        <div className="w-[100%] md:w-[45%] flex flex-col gap-10">
                            <p className="font-semibold text-richblack-800 text-sm md:text-[16px]">
                            In the realm of modern StudySkill, one must establish their own standards. In today's landscape, being a proficient specialist demands more than just technical expertise.
                            </p>
                            <div className="w-fit">
                                <CTAbutton active={true}>Learn More</CTAbutton>
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] flex flex-col md:flex-row items-center justify-evenly gap-10 md:gap-4 relative py-2 md:py-12">
                        <div>
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <LiaCertificateSolid size={30} color="#118AB2" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">Leadership</p>
                                        <p className="text-sm text-pure-greys-300 ">
                                            Fully committed to the success company.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <FaGraduationCap size={30} color="#EF476F" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">Responsibility</p>
                                        <p className="text-sm text-pure-greys-300 ">
                                            Students will always be our top priority.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <SlDiamond size={20} color="#05BF8E" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">Flexibility</p>
                                        <p className="text-sm text-pure-greys-300 ">
                                            The ability to switch is an important skill.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <BsFileCodeFill size={25} color="#E7C009" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">Solve the problem</p>
                                        <p className="text-sm text-pure-greys-300 ">
                                            Code your way to a solution.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img
                                src={jobInDemand}
                                alt="jobIndemand"
                                className="object-contain w-[500px] md:w-[520px] rounded-sm shadow-[23px_25px_0px_0px_#fff,-2px_3px_8px_0px_#1FA2FF]"
                            />
                        </div>

                        <div
                            className="bg-[#014A32] w-[280px] md:w-[330px] h-[75px] md:h-[90px] absolute -bottom-[20px] md:bottom-[10px]
                         right-[28px] md:right-[230px] flex items-center justify-evenly rounded-sm"
                        >
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-2xl text-white">10</p>
                                <div className="flex flex-col text-[#05A77B] text-xs">
                                    <p>YEARS</p>
                                    <p>EXPERIENCE</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[#05A77B]">|</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="font-bold text-2xl text-white">250</p>
                                <div className="flex flex-col text-[#05A77B] text-xs">
                                    <p>TYPES OF</p>
                                    <p>COURSES</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[100%] flex flex-col gap-12 items-center mt-14 mb-12">
                    <div className="w-[80%] flex flex-col items-center gap-2">
                        <div className="flex gap-2 items-center">
                            <p className="text-2xl md:text-3xl font-semibold">Learn, Practice, </p>
                            <HighlightText text={"Succeed"} />
                        </div>
                        <p className="font-semibold w-[90%] text-sm md:text-[15px] md:w-[80%] text-center">
                            Using spin making learning multiple languages easy. with 20+
                            languages realistic voice-over, progress tracking, custom schedule
                            and more.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center">
                        <img
                            src={progress}
                            alt=""
                            className="object-contain w-[300px] md:w-[350px] md:-mr-28"
                        />
                        <img src={compare} alt="" className="object-contain w-[330px] md:w-[380px]" />
                        <img
                            src={lessons}
                            alt=""
                            className="object-contain w-[330px] md:w-[380px] md:-ml-28"
                        />
                    </div>

                    <div className="w-fit">
                        <CTAbutton active={true}>Learn More</CTAbutton>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div className="w-[100%] bg-[#000814] flex flex-col items-center gap-20">
                <div className="w-[90%] mt-16 md:mt-28 flex flex-col-reverse md:flex-row items-center justify-evenly gap-5">
                    <div className="mt-12 md:mt-0">
                        <img
                            src={instructor}
                            alt="instructorImage"
                            className="object-contain w-[300px] md:w-[520px] rounded-sm shadow-[9px_9px_0px_0px_#F1F2FF,-3px_-2px_28px_0px_#1FA2FF]  md:shadow-[14px_14px_0px_0px_#F1F2FF,-6px_-5px_28px_0px_#1FA2FF]"
                        />
                    </div>

                    <div className="w-[80%] md:w-[30%] flex flex-col gap-3">
                        <div className="flex flex-row gap-2 md:gap-0 md:flex-col">
                            <p className="text-2xl md:text-3xl font-semibold text-white">Become an</p>
                            <HighlightText text={"instructor"} />
                        </div>
                        <p className="text-sm md:text-[15px] text-pure-greys-300 font-semibold">
                            Instructors from around the world teach millions of students on
                            StudySkill. We provide the tools and skills to teach what you
                            love.
                        </p>
                        <div className="w-fit mt-8">
                            <CTAbutton 
                            active={true}
                            linkto={user ? "/dashboard/my-profile" : "/signup"}
                            >
                                <div className="flex items-center gap-2">
                                    <p>Start Teaching Today</p>
                                    <BsArrowRight />
                                </div>
                            </CTAbutton>
                        </div>
                    </div>
                </div>

                <div className="w-[100%] flex lg:flex-row flex-col gap-10 lg:gap-2 items-center justify-evenly mt-8 mb-8">
                    <div className="flex flex-col items-center gap-2 text-center w-[320px] lg:w-[250px]">
                        <div>
                            <AiOutlineCompass size={35} color="white" />
                        </div>
                        <p className="text-white font-semibold text-xl md:text-2xl">Learn anything</p>
                        <p className="font-semibold text-sm text-pure-greys-300">
                            Explore any interest or trending topic, take prerequisites, and
                            advance your skills
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center w-[320px] lg:w-[250px]">
                        <div>
                            <TbPigMoney size={35} color="white" />
                        </div>
                        <p className="text-white font-semibold text-xl md:text-2xl">Save money</p>
                        <p className="font-semibold text-sm text-pure-greys-300">
                            Spend less money on your learning if you plan to take multiple
                            courses this year
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center w-[320px] lg:w-[250px]">
                        <div>
                            <GiBrain size={35} color="white" />
                        </div>
                        <p className="text-white font-semibold text-xl md:text-2xl">
                            Flexible Learning
                        </p>
                        <p className="font-semibold text-sm text-pure-greys-300">
                            Learn at your own pace, move between multiple courses, or switch
                            to a different course
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center w-[320px] lg:w-[250px]">
                        <div className="text-white">
                            <PiCertificate size={35} color="white" />
                        </div>
                        <p className="text-white font-semibold text-xl  md:text-2xl">Certificates</p>
                        <p className="font-semibold text-sm text-pure-greys-300">
                            Earn a certificate for every learning program that you complete.
                        </p>
                    </div>
                </div>

                {/* Reviews   */}
                <div className="w-100% flex flex-col items-center">
                    <p className="text-white text-2xl font-semibold">Review from Learners </p>
                    <ReviewSlider/>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    );
};

export default Home;
