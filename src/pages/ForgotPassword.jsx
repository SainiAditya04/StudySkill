import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false); // to check whether the email has been sent or not
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className='bg-[#000814] h-screen w-screen flex flex-col items-center'>

            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {
                            !emailSent ? (

                                <div className='flex flex-col gap-2 lg:gap-3 mt-36'>
                                    <div className='flex flex-col gap-1 lg:gap-2'>
                                        <p className=' text-richblack-5 font-bold text-xl lg:text-3xl'> Reset your password </p>
                                        <p className='text-sm text-richblack-400'>Enter your registered email to get the reset link.</p>
                                    </div>
                                    <form onSubmit={handleOnSubmit} className=' w-[300px] lg:w-[400px] mt-2 lg:mt-4'>
                                        <label>
                                            <p className=" text-richblack-5 text-sm mb-1">Email Address <sup className="text-pink-200">*</sup></p>
                                            <input
                                                required
                                                type="text"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email address"
                                                style={{
                                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                                }}
                                                className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            className="w-full mt-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"
                                        >
                                            Reset password
                                        </button>
                                    </form>
                                </div>) : (<div className='flex flex-col gap-2 lg:gap-3 mt-36 w-[300px] lg:w-[400px]'>
                                    <p className=' text-richblack-5 font-bold text-xl lg:text-3xl'> Check email </p>
                                    <p className=' text-richblack-400 text-sm'>Reset password link has been sent to your registered email {email}</p>
                                    <button
                                        type="submit"
                                        className="w-full mt-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"
                                    >
                                        Resend link
                                    </button>
                                </div>)
                        }
                    </div>
                )
            }

        </div>
    )
}

export default ForgotPassword
