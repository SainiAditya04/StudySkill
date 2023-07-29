import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import 'swiper/css/autoplay'

import { FreeMode, Pagination, Autoplay } from "swiper/modules"
import Course_Card from "./Course_Card"

const Course_Slider = ({ Courses }) => {

    return (
        <div>
            {Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    // loop={true}
                    modules={[Pagination, Autoplay]}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <Course_Card course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )}
        </div>
    )
}

export default Course_Slider
