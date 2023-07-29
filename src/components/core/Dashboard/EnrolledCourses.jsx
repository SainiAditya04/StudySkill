import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(null);


    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    console.log("printing the enrolled courses", enrolledCourses);

    return (
        <>
            <div className='flex items-center gap-1 text-sm mb-3'>
                <p className=' text-richblack-300'>Home/</p>
                <p className=' text-richblack-300'>Dashboard/</p>
                <p className=' text-[#a435f0] font-semibold'>Enrolled Courses</p>
            </div>
            <div className="text-2xl text-richblack-25">Enrolled Courses</div>
            {!enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className="grid h-[10vh] text-2xl w-full place-content-center text-richblack-50">
                    You have not enrolled in any course yet.
                    {/* TODO: Modify this Empty State */}
                </p>
            ) : (
                <div className="my-8 text-richblack-5">

                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-800 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>

                    {/* Course Names */}
                    {enrolledCourses.map((course, i, arr) => (
                        <div
                            className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            key={i}
                        >
                            <div
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                }}
                            >
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-[150px] w-[210px] rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                            <div className="flex text-sm w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    bgColor='#1FA2FF'
                                    baseBgColor='#e0e0de'
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default EnrolledCourses
