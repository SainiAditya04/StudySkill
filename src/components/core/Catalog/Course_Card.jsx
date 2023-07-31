import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"


const Course_Card = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    }, [course])

    return (
        <div >
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div className="rounded-sm">
                        <img
                            src={course?.thumbnail}
                            alt="course thumnail"
                            className={`${Height} w-full rounded-sm object-cover `}
                        />
                    </div>

                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-50">
                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">{avgReviewCount || 0}</span>

                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="text-richblack-400 text-sm">
                                {course?.ratingAndReviews?.length} Ratings
                            </span>
                        </div>
                        <p className="text-lg text-richblack-5">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card
