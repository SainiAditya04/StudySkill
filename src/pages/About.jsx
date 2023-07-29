import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import about1 from "../assets/Images/aboutus1.png"
import about2 from "../assets/Images/aboutus2.png"
import about3 from "../assets/Images/aboutus3.png"
import HighlightText2 from '../components/core/HomePage/HighlightText2'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div>
            {/* section 1 */}
            <section className=' bg-richblack-800 w-screen flex flex-col items-center gap-2'>
                <p className=' text-richblack-400 font-semibold my-10'>About us</p>

                {/* for laptops */}
                <div className='hidden md:flex flex-col items-center mb-5'>
                    <p className='text-2xl md:text-3xl font-semibold text-richblack-5'>Driving Innovation in Online Education for a</p>
                    <HighlightText text={"Brighter Future"} />
                </div>
                {/* for mobile */}
                <div className='text-2xl flex md:hidden flex-col items-center font-semibold text-richblack-5 mb-6'>
                    <p>Driving Innovation in Online</p>
                    <div className='flex gap-1'>
                        <p>Education for a </p>
                        <HighlightText text={"Brighter Future"} />
                    </div>
                </div>

                <p className='text-sm w-[94%] md:w-[780px] text-center font-semibold text-richblack-400'>StudySkill is at the forefront of driving innovation in online education. We are passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                {/* images section */}
                <div className='relative w-full flex items-center justify-center mt-12'>

                    <div className='w-[150px] h-[100px] bg-[#FF512F] opacity-[39%] rounded-full shadow-[0px_7px_51px_50px_#FF512F] absolute right-[29%] md:right-[45%] top-[3%] md:top-[8%] z-0'></div>

                    <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 z-10 w-[90%] md:w-[65%]'>
                        <img src={about1} alt="" className='object-contain w-[270px] md:w-[300px] rounded-sm' />
                        <img src={about2} alt="" className='object-contain w-[270px] md:w-[300px] rounded-sm' />
                        <img src={about3} alt="" className='object-contain w-[270px] md:w-[300px] rounded-sm' />
                    </div>
                </div>

            </section>

            {/* section 2 */}
            <section className='bg-[#000814] w-screen flex flex-col items-center'>

                {/* for laptops */}
                <div className='hidden w-[90%] my-20 text-richblack-5 font-semibold text-2xl md:text-3xl md:flex flex-col items-center'>
                    <div className='flex items-center gap-1'>
                        <p>We are passionate about</p>
                        <HighlightText2 text={"revolutionizing"} />
                        <p> the way we learn.</p>
                    </div>
                    <p>Our innovative platform combines technology, expertise, and community to create an </p>
                    <HighlightText text={"unparalleled educational experience."} />
                </div>
                {/* for mobile */}
                <div className='w-[90%] flex md:hidden flex-col font-semibold text-2xl text-richblack-5 my-16'>
                    <p>We are passionate about</p>
                    <div className='flex gap-1'>
                        <HighlightText2 text={"revolutionizing"} />
                        <p>the way we</p>
                    </div>
                    <p>learn. Our innovative platform</p>
                    <p>combines technology,</p>
                    <p>expertise, and community </p>
                    <p>to create an</p>
                    <HighlightText text={"unparalleled educational experience."} />
                </div>

                <div className='w-[90%] flex flex-col md:flex-row justify-evenly gap-14 md:gap-3 mb-8'>
                    <div className='flex flex-col gap-2 w-[90%] md:w-[40%]'>
                        <HighlightText2 text={"Our Vision"} />
                        <p className=' text-richblack-400 text-sm font-semibold text-left'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    <div className='flex flex-col gap-2 w-[90%] md:w-[40%]'>
                        <HighlightText text={"Our mission"} />
                        <p className=' text-richblack-400 text-sm font-semibold text-left'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            <div className=' bg-richblack-900 py-5 flex flex-col gap-2 items-center justify-center'>
                <p className=' text-richblack-25 font-semibold text-2xl'>Review from Learners</p>
                <ReviewSlider/>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default About

