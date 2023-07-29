import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { BiArrowBack } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


export default function VideoDetailsSidebar({ setReviewModal }) {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) return

            // get the current section index
            const currentSectionIndx = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )

            // get the current subSection index
            const currentSubSectionIndx = courseSectionData?.[
                currentSectionIndx
            ]?.subSection.findIndex((data) => data._id === subSectionId)

            // based on section and subSection index, we get 
            // the current video visible on UI
            const activeSubSectionId =
                courseSectionData[currentSectionIndx]?.subSection?.[
                    currentSubSectionIndx
                ]?._id

            setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
            setVideoBarActive(activeSubSectionId)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

                    {/* back button  */}
                    <div className="flex w-full items-center justify-between ">
                        <div
                            onClick={() => {
                                navigate(`/dashboard/enrolled-courses`)
                            }}
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-full p-1 text-richblack-100 cursor-pointer hover:scale-90 transition-all duration-200"
                            title="back"
                        >
                            <BiArrowBack size={20} />
                        </div>
                    </div>

                    {/* course name  */}
                    <div className="flex flex-col">
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>

                </div>

                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {courseSectionData.map((course, index) => (
                        <div
                            className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onClick={() => setActiveStatus(course?._id)}
                            key={index}
                        >
                            {/* Section */}
                            <div className="flex flex-row justify-between bg-richblack-700 px-5 py-4">
                                <div className="w-[70%] font-semibold">
                                    {course?.sectionName}
                                </div>
                                <div className="flex items-center gap-3">

                                    <span
                                        className={`${activeStatus === course?.sectionName
                                            ? "rotate-0"
                                            : "rotate-180"
                                            } transition-all duration-500`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>

                            {/* Sub Sections */}
                            {activeStatus === course?._id && (
                                <div className="transition-[height] duration-500 ease-in-out">
                                    {course.subSection.map((topic, i) => (
                                        <div
                                            className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                                                ? " bg-[#8e08e8] font-semibold text-richblack-900"
                                                : "hover:bg-richblack-900"
                                                } `}
                                            key={i}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                )
                                                setVideoBarActive(topic._id)
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(topic?._id)}
                                                onChange={() => { }}
                                            />
                                            {topic.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center my-5">
                    <button
                    onClick={() => setReviewModal(true)}
                    className="w-[200px] py-2 text-[#1FA2FF] underline font-semibold flex items-center gap-1"
                    >
                        <AiOutlinePlus size={20} className="font-bold"/>
                        Add Review
                    </button>
                </div>
            </div>
        </>
    )
}
