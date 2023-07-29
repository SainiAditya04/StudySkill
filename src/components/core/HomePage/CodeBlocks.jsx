import React from 'react'
import CTAbutton from './CTAbutton'
import HighlightText from './HighlightText'
import { BsArrowRight } from "react-icons/bs"
import { TypeAnimation } from 'react-type-animation'
import "./codeblock.css"


const CodeBlocks = (props) => {
    const {heading1, hgltHeading, heading2, subHeading, cta1, cta2, codeblock} = props
    return (
        <div className='flex flex-col md:flex-row items-center gap-10 lg:gap-1 justify-evenly w-screen mt-[70px] py-8'>

            <section className='w-[90%] md:w-[40%] flex flex-col gap-3'>
                {/* { for laptops } */}
                <div className='text-white hidden md:block'>
                    <div className='flex items-center gap-2 text-3xl font-semibold'>
                        <p>{heading1}</p>
                        <HighlightText text={hgltHeading} />
                    </div>
                    <p className=' text-2xl md:text-3xl font-semibold'>{heading2}</p>
                </div>
                {/* for mobile */}
                <div className='text-2xl flex flex-col items-center md:hidden text-richblack-5 font-semibold'>
                    <div className='flex items-center gap-1'>
                        <p>Unlock your</p>
                        <HighlightText text={"Coding potential"}/>
                    </div>
                    <p>With our online courses</p>
                </div>

                <div className=' text-pure-greys-300 text-center md:text-left text-sm font-semibold'>
                    <p>{subHeading}</p>
                </div>

                <div className='w-full flex justify-center md:justify-start gap-4 mt-2 mb-1'>
                    <CTAbutton active={true} linkto={"/catalog/web-development"}>
                        <div className='flex items-center gap-2'>
                            {cta1}
                            <BsArrowRight />
                        </div>
                    </CTAbutton>
                    <CTAbutton active={false}>
                        {cta2}
                    </CTAbutton>
                </div>

            </section>

            <section className='bgCustomColor w-[90%] md:w-[35%] flex gap-1 text-sm p-6 font-inter mb-20 md:mb-0 relative'>
                <div className='w-[200px] h-[170px] bg-[#1FA2FF] opacity-[15%] rounded-full
                absolute right-[210px] md:right-[320px] bottom-[90px] md:bottom-[105px] shadow-[0px_7px_51px_50px_#1FA2FF]'>

                </div>

                <div className='flex flex-col gap-1 text-center text-pure-greys-300 w-[10%]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>

                <div className='w-[90%] h-[300px] md:h-[250px] text-left font-bold flex flex-col gap-9 font-inter text-[#D43D63]'>
                    <TypeAnimation
                        sequence={[codeblock, 3000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block"
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </section>
        </div>
    )
}

export default CodeBlocks
