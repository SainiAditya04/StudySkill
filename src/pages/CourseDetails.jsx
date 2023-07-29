import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"

function CourseDetails() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Getting courseId from url parameter
    const { courseId } = useParams()

    // Declear a state to save the course details
    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    // fetch the details of the course
    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetchCourseDetails(courseId)
                // console.log("course details res: ", res)
                setResponse(res)
            } catch (error) {
                console.log("Could not fetch Course Details")
            }
        })()
    }, [courseId])


    // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
        setAvgReviewCount(count)
    }, [response])

    // // Collapse all
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }

    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

    useEffect(() => {
        let lectures = 0
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
            console.log("printing the subsection length, ", sec.subSection.length);
        })
        setTotalNoOfLectures(lectures)
    }, [response])

    if (loading || !response) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    if (!response.success) {
        return <Error />
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = response.data?.courseDetails

    console.log("Printing the response", response.data);

    const handleBuyCourse = () => {
        if (token) {
            BuyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (paymentLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className=" bg-richblack-900">

            <div className={`relative w-full bg-richblack-800`}>

                {/* Hero Section */}
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                    <div className="mx-auto grid min-h-[380px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto w-full"
                            />
                        </div>
                        
                        <div
                            className={`z-30 my-4 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                        >
                            <div className="flex items-center gap-1 text-sm text-richblack-400">
                                <p>Home /</p>
                                <p>Learning /</p>
                                <p className="text-[#a435f0] font-semibold"> {response.data?.courseDetails?.category?.name} </p>
                            </div>
                            <div>
                                <p className=" text-[28px] md:text-[35px] font-semibold text-richblack-5">
                                    {courseName}
                                </p>
                            </div>

                            <p className={`text-richblack-200 text-sm md:text-[17px]`}>{courseDescription}</p>
                            
                            <div className="text-md flex flex-wrap items-center gap-2">
                                <span className="text-yellow-25">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span className=" text-sm md:text-[16px]">{`(${ratingAndReviews.length} reviews)`}</span>
                                <span className=" text-sm md:text-[16px]">{`${studentsEnrolled.length} students enrolled`}</span>
                            </div>
                            <div>
                                <p className="text-sm md:text-[16px]">
                                    Created By {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-sm md:text-[16px]">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BiInfoCircle size={18}/> Created at {formatDate(createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt size={18}/> English
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-[20px] font-semibold text-richblack-5">
                                Rs. {price}
                            </p>
                            <button className="bg-[#a435f0] font-semibold py-[5px] rounded-sm text-richblack-800" onClick={handleBuyCourse}>
                                Buy Now
                            </button>
                            <button className=" bg-richblack-700 text-white font-semibold py-[5px] rounded-sm">Add to Cart</button>
                        </div>
                    </div>

                    {/* Courses Card */}
                    <div className="right-[50px] top-[80px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        <CourseDetailsCard
                            course={response?.data?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>

            </div>

            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* What will you learn section */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-[28px] font-semibold">What you'll learn</p>
                        <div className="mt-5">
                            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="max-w-[830px] ">

                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex gap-2">
                                    <span>
                                        {courseContent.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {totalNoOfLectures} {`lecture(s)`}
                                    </span>
                                    <span>{response.data?.totalDuration} total length</span>
                                </div>
                                <div>
                                    <button
                                        className="text-[#a435f0] font-semibold"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}
                        <div className="py-4">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                        {/* Author Details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Instructor</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={
                                        instructor.image
                                            ? instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails
