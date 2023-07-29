import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { resetPassword } from "../services/operations/authAPI"


const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
    return (
        <div className="bg-[#000814] w-[100%] h-screen flex flex-col gap-9 items-center border-[1px]">

            <div className="flex flex-col items-center gap-2">
                <p className=" text-richblack-5 text-xl md:text-2xl font-semibold mt-5">
                    Reset Password
                </p>
                <p className='text-sm text-richblack-400 font-semibold'>Enter your new password and you're done</p>
            </div>

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 w-[300px] lg:w-[400px]">

                <label className="relative">
                    <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
                        New Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter New Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>

                <label className="relative mt-3 block">
                    <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
                        Confirm New Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm New Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                    />
                    <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>

                <button
                    type="submit"
                    className="mt-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"                >
                    Reset Password
                </button>

            </form>
        </div>
    )
}

export default UpdatePassword
