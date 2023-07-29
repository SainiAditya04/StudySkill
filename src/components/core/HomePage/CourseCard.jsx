import React from 'react'
import { HiUsers } from "react-icons/hi"
import { FaUserTie } from "react-icons/fa"

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    const { heading, description, level, lessionNumber } = cardData;
    function currentCardHandler(){
        setCurrentCard(heading);
    }
    return (
        <div className={`w-[300px] h-[300px] cursor-pointer flex flex-col gap-5 justify-between p-4 rounded-sm
        ${currentCard === heading ? "bg-white shadow-[22px_24px_0px_0px_#FFD60A]": "bg-[#161D29]"}`}
        onClick={currentCardHandler}>

            <div className='flex flex-col gap-5'>
                <p className={`font-bold ${currentCard === heading ? "text-black": "text-white"}`}>{heading}</p>

                <p className=' text-pure-greys-300'>{description}</p>
            </div>

            <div className='flex flex-row items-center justify-between px-4 py-2 mt-9'>

                <div className={`flex flex-row items-center text-sm gap-3 ${currentCard === heading ? "text-black" : "text-white"}`}>
                    <HiUsers size={20} />
                    <p>{level}</p>
                </div>

                <div className={`flex flex-row items-center text-sm gap-3 ${currentCard === heading ? "text-black" : "text-white"}`}>
                    <FaUserTie size={20} />
                    <p>{lessionNumber} Lessons</p>
                </div>

            </div>
        </div>
    )
}

export default CourseCard
