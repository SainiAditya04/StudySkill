import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"
import { AiOutlineReload } from "react-icons/ai"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"


const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const playerRef = useRef(null)
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([])
    const [previewSource, setPreviewSource] = useState("")
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    console.log("Video data", videoData);

    useEffect(() => {
        ; (async () => {
            if (!courseSectionData.length) return
            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`)
            } else {
                // console.log("courseSectionData", courseSectionData)
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )
                // console.log("filteredData", filteredData)
                const filteredVideoData = filteredData[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                )
                // console.log("filteredVideoData", filteredVideoData)
                if(filteredVideoData){
                    setVideoData(filteredVideoData[0])
                }
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false)
            }
        })()
    }, [courseSectionData, courseEntireData, location.pathname])

    // check if the lecture is the first video of the course
    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true
        } else {
            return false
        }
    }

    // go to the next video
    const goToNextVideo = () => {

        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)


        if (currentSubSectionIndx !== noOfSubsections - 1) {
            // go to the next video of the same section
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx + 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )
        } else {
            // go to the next section and get the first video 
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
            const nextSubSectionId =
                courseSectionData[currentSectionIndx + 1].subSection[0]._id
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }
    }

    // check if the lecture is the last video of the course
    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true
        } else {
            return false
        }
    }

    // go to the previous video
    const goToPrevVideo = () => {
        // console.log(courseSectionData)

        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[
                    prevSubSectionLength - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true)
        const res = await markLectureAsComplete(
            { courseId: courseId, subsectionId: subSectionId },
            token
        )
        console.log("mark lecture as complete", res);
        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col py-4 gap-3 text-white bg-richblack-900">
            {!videoData ? (
                <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                />
            ) : (
                <Player
                    ref={playerRef}
                    aspectratio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                >
                    <BigPlayButton position="center" />
                    {/* Render When Video Ends */}
                    {videoEnded && (
                        <div
                            style={{
                                backgroundImage:
                                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            }}
                            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                        >
                            {!completedLectures.includes(subSectionId) && (
                                <div
                                    onClick={() => handleLectureCompletion()}
                                    className="text-xl max-w-max px-4 mx-auto cursor-pointer"
                                >
                                    {!loading ? <p>Mark as completed</p> : <p>Loading...</p>}
                                </div>
                            )}
                            <div
                            className="text-lg flex items-center gap-2 max-w-max px-4 mx-auto mt-2"
                            onClick={() => {
                                if (playerRef?.current) {
                                    // set the current time of the video to 0
                                    playerRef?.current?.seek(0)
                                    setVideoEnded(false)
                                }
                            }}
                            >
                                <AiOutlineReload size={20}/>
                                <p>Watch again</p>
                            </div>
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-lg">
                                {!isFirstVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className="flex items-center gap-2"
                                    >
                                        <BiSkipPrevious size={30}/>
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className="flex items-center gap-2"
                                    >
                                        Next
                                        <BiSkipNext size={30}/>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}

            <h1 className="mt-2 text-2xl font-semibold">{videoData?.title}</h1>
            <p className="text-sm text-richblack-300 font-semibold">{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails
// video
