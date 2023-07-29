import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText2 from "./HighlightText2";
import CourseCard from "./CourseCard";


const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(
        HomePageExplore[0].courses[0].heading
    );

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

    return (
        <div className=" hidden w-[100%] relative mt-16 h-[350px] md:flex flex-col items-center">
            <div className="font-bold w-[90%] lg:w-fit text-2xl md:text-3xl text-white flex flex-col md:flex-row md:gap-2 items-center">
                <p>Unleash the power of</p>
                <HighlightText2 text={"programming"} />
            </div>

            <p className="font-semibold text-pure-greys-300 text-sm mt-2 text-center">
                Learn to build anything you can imagine.
            </p>

            <div className="flex flex-row bg-richblack-800 rounded-full mt-8 mb-8 p-2">
                {tabName.map((element, index) => {
                    return (
                        <div
                            className={`text-sm flex flex-row items-center gap-2${currentTab === element
                                    ? " bg-richblack-900 text-richblack-5"
                                    : " text-richblack-200"
                                } rounded-full transition-all duration-200
                                cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2`}
                            key={index}
                            onClick={() => setMyCards(element)}
                        >
                            {element}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:absolute md:-bottom-[140px]">
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key = {index}
                                cardData = {element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>

        </div>
    );
};

export default ExploreMore;
