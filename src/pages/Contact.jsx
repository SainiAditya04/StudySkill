import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import CountryCode from "../data/countrycode.json"
import Footer from '../components/common/Footer';
import { TbMessage } from "react-icons/tb"
import { ImEarth } from "react-icons/im"
import { MdCall } from "react-icons/md"

const Contact = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: "OK" };
            console.log("Logging response", response);
            setLoading(false);
        }
        catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);


    return (
        <div className='w-[100%] bg-[#000814] flex flex-col items-center'>

            <div className='w-[100%] md:w-[75%] bg-[#000814] flex flex-col md:flex-row items-center md:items-start justify-evenly md:gap-10'>
                <div className=' h-[310px] md:h-[350px] w-[300px] md:w-[350px] rounded-md bg-richblack-800 my-12 md:my-16 flex flex-col items-center justify-center gap-8'>

                    <div>
                        <div className=' text-richblack-25 font-semibold flex items-center gap-1'>
                            <TbMessage size={20}/>
                            <p className='text-sm'>Chat with us</p>
                        </div>
                        <div className=' text-sm font-semibold text-richblack-400 ml-6'>
                            <p>Our team is here to help you 24x7.</p>
                            <p>studyskill@gmail.com</p>
                        </div>
                    </div>

                    <div>
                        <div className=' text-richblack-25 font-semibold flex items-center gap-1'>
                            <ImEarth size={20}/>
                            <p className='text-sm'>Visit us</p>
                        </div>
                        <div className=' text-sm font-semibold text-richblack-400 ml-6'>
                            <p>Meet in person</p>
                            <p>Call us to book an appointment</p>
                        </div>
                    </div>

                    <div>
                        <div className=' text-richblack-25 font-semibold flex items-center gap-1'>
                            <MdCall size={20}/>
                            <p className='text-sm'>Call us</p>
                        </div>
                        <div className=' text-sm font-semibold text-richblack-400 ml-6'>
                            <p>Our team is here to help you 24x7.</p>
                            <p>+91 79821 55925</p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(submitContactForm)}
                    className='w-[350px] md:w-[530px] border-[1px] border-richblack-600 my-8 md:my-16 p-3 md:p-5 rounded-md'
                >

                    <div className=' mb-4'>
                        <p className='w-fit text-xl md:text-2xl text-richblack-5 font-semibold'>Got a idea? We've got the skills.</p>
                        <p className='w-fit text-xl md:text-2xl text-richblack-5 font-semibold'>Let's team up.</p>
                        <p className='w-fit text-sm text-richblack-400 font-semibold'>Tell us more about yourself and your idea.</p>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex flex-col md:flex-row gap-2 w-full'>
                            {/* firstName */}
                            <div className='flex flex-col w-full md:w-[50%]'>
                                <label htmlFor='firstname' className='text-sm text-richblack-25'>First Name <sup className=' text-pink-200'>*</sup></label>
                                <input
                                    type='text'
                                    name='firstname'
                                    id='firstname'
                                    placeholder='Enter first name'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                    {...register("firstname", { required: true })}
                                />
                                {
                                    errors.firstname && (
                                        <span className=' text-pink-300 text-sm'>
                                            Please enter your name!
                                        </span>
                                    )
                                }
                            </div>

                            {/* lastName */}
                            <div className='flex flex-col w-full md:w-[50%]'>
                                <label htmlFor='lastname' className='text-sm text-richblack-25'>Last Name <sup className=' text-pink-200'>*</sup></label>
                                <input
                                    type='text'
                                    name='lastname'
                                    id='lastname'
                                    placeholder='Enter Last name'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                    {...register("lastname")}
                                />
                            </div>

                        </div>


                        {/* email */}
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-white text-sm my-1'>Email Address <sup className=' text-pink-300'>*</sup></label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter email Address'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                {...register("email", { required: true })}
                            />
                            {
                                errors.email && (
                                    <span>
                                        Please enter your email address
                                    </span>
                                )
                            }
                        </div>

                        {/* phoneNo */}
                        <div className='flex flex-col'>

                            <label htmlFor='phonenumber' className=' text-white text-sm my-1'>Phone Number</label>

                            <div className='flex flex-row gap-1'>
                                {/* dropdown */}

                                <select
                                    name='dropdown'
                                    id="dropdown"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[24%] md:w-[17%] outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                    {...register("countrycode", { required: true })}
                                >
                                    {
                                        CountryCode.map((element, index) => {
                                            return (
                                                <option key={index} value={element.code}>
                                                    {element.code} -{element.country}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                                <input
                                    type='number'
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='12345 67890'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                    {...register("phoneNo",
                                        {
                                            required: { value: true, message: "Please enter Phone Number" },
                                            maxLength: { value: 10, message: "Invalid Phone Number" },
                                            minLength: { value: 8, message: "Invalid Phone Number" }
                                        })}
                                />

                            </div>
                            {
                                errors.phoneNo && (
                                    <span>
                                        {errors.phoneNo.message}
                                    </span>
                                )
                            }

                        </div>

                        {/* message */}
                        <div className='flex flex-col'>
                            <label htmlFor='message'>Message</label>
                            <textarea
                                name='message'
                                id='message'
                                cols="30"
                                rows="7"
                                placeholder='Enter Your message here'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                {...register("message", { required: true })}
                            />
                            {
                                errors.message && (
                                    <span>
                                        PLease enter your message.
                                    </span>
                                )
                            }
                        </div>

                        <button type='submit'
                            className="mt-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"

                        >
                            Send Message
                        </button>
                    </div>

                </form>
            </div>
            

            {/* {footer} */}
            <Footer />
        </div>
    )
}

export default Contact
