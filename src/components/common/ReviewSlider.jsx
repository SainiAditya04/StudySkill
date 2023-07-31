import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import { FaStar } from "react-icons/fa"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import { FreeMode, Pagination, Autoplay } from "swiper/modules"


import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        ; (async () => {
            const { data } = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            )
            if (data?.success) {
                setReviews(data?.data)
            }
        })()
    }, [])

    return (
        <div className="text-white flex items-center justify-center">

            {/* review slider for laptops */}
            <div className="my-[20px] h-[350px] w-screen hidden md:block">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    // loop={true}
                    modules={[Pagination, Autoplay]}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="w-[90%]"
                >
                    {reviews.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="h-[220px] w-[300px] gap-3 bg-richblack-800 p-3 text-[14px] rounded-md text-richblack-25">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                review?.user?.image
                                                    ? review?.user?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                            }
                                            alt=""
                                            className="h-9 w-9 rounded-full object-contain"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className="text-[12px] font-medium text-richblack-500">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="font-medium text-richblack-25">
                                        {review?.review.split(" ").length > truncateWords
                                            ? `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-yellow-100">
                                            {review.rating.toFixed(1)}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                </Swiper>
            </div>

            {/* review slider for mobile */}
            <div className="my-[20px] h-[350px] w-screen flex items-center justify-center md:hidden">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    // loop={true}
                    modules={[Pagination, Autoplay]}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    className="w-[50%]"
                >
                    {reviews.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="h-[220px] w-[300px] gap-3 bg-richblack-800 p-3 text-[14px] rounded-md text-richblack-25">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                review?.user?.image
                                                    ? review?.user?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                            }
                                            alt=""
                                            className="h-9 w-9 rounded-full object-contain"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className="text-[12px] font-medium text-richblack-500">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="font-medium text-richblack-25">
                                        {review?.review.split(" ").length > truncateWords
                                            ? `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-yellow-100">
                                            {review.rating.toFixed(1)}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider
