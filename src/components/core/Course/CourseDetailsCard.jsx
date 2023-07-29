import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaChalkboardTeacher, FaMobileAlt, FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ACCOUNT_TYPE } from "../../../utils/constants"
import { addToCart } from "../../../slices/cartSlice"
import { AiOutlineClockCircle } from "react-icons/ai"
import { RxCursorArrow } from "react-icons/rx"
import { PiCertificate } from "react-icons/pi"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: courseId,
    } = course

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    console.log("PRINTING THE COURSE...", course);

    // console.log("Student already enrolled ", course?.studentsEnrolled, user?._id)

    return (
        <>
            <div
                className={`flex flex-col gap-3 rounded-md bg-richblack-700 p-3 text-richblack-5`}
            >
                {/* Course Image */}
                <img
                    src={ThumbnailImage}
                    alt={course?.courseName}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-md object-cover md:max-w-full"
                />

                {/* data about the course  */}
                <div className="px-4">
                    <div className="space-x-3 pb-4 text-[18px] md:text-[25px] font-semibold">
                        Rs. {CurrentPrice}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            className="bg-[#a435f0] text-richblack-800 py-[6px] rounded-md font-semibold hover:scale-95 transition-all duration-200"
                            onClick={
                                user && course?.studentsEnrolled.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && course?.studentsEnrolled.includes(user?._id)
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>
                        {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className=" bg-richblack-800 text-richblack-25 py-[6px] rounded-md font-semibold hover:scale-95 transition-all duration-200">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="pb-2 pt-3 text-center text-sm font-semibold text-richblack-300">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>

                    <div className={``}>
                        <p className={`my-2 text-lg font-semibold `}>
                            This Course Includes :
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                            {/* {course?.instructions?.map((item, i) => {
                                return (
                                    <p className={`flex gap-2 items-center`} key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{item}</span>
                                    </p>
                                )
                            })} */}

                            <div className="flex items-center gap-2 font-semibold text-[15px]">
                                <AiOutlineClockCircle size={18}/>
                                <p>Hours on-demand lecture</p>
                            </div>

                            <div className="flex items-center gap-2 font-semibold text-[15px]">
                                <FaChalkboardTeacher size={18}/>
                                <p>Taught by industry experts</p>
                            </div>

                            <div className="flex items-center gap-2 font-semibold text-[15px]">
                                <RxCursorArrow size={17}/>
                                <p>Full lifetime access</p>
                            </div>

                            <div className="flex items-center gap-2 font-semibold text-[15px]">
                                <FaMobileAlt size={18}/>
                                <p>Access on Mobile and TV</p>
                            </div>

                            <div className="flex items-center gap-2 font-semibold text-[15px]">
                                <PiCertificate size={19}/>
                                <p>Certificate of completion</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className="mx-auto flex items-center font-semibold gap-2 py-6 text-[#a435f0] "
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetailsCard
