import React, { useState } from "react";
import { AiOutlineCaretRight, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
import { sendOtp } from "../services/operations/authAPI";
import Tab from "../components/common/Tab";


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { firstName, lastName, email, password, confirmPassword } = formData


    // handle the input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password and confirm password does not match!");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        }

        // setting signup data to state
        // to be used after OTP verification
        dispatch(setSignupData(signupData));

        // send OTP for user verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT);

    }

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <div className="bg-[#000814] w-[100%] h-screen flex flex-col gap-1 lg:gap-3 items-center border-[1px]">
            <div className="flex flex-col items-center gap-1 w-full text-center">
                <p className=" text-richblack-25 text-xl lg:text-2xl font-semibold mt-2 lg:mt-4">
                    Build skills for Today, tomorrow, and beyond.
                </p>
                <p className=" font-edu-sa text-[#1FA2FF] font-semibold">Be unstoppable</p>
            </div>

            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 lg:gap-4 mt-2 w-[300px] lg:w-[400px]">

                <label>
                    <p className=" text-richblack-5 text-sm mb-1">
                        First Name <sup className="text-pink-200">*</sup>{" "}
                    </p>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                    />
                </label>

                <label>
                    <p className=" text-richblack-5 text-sm mb-1">
                        last Name <sup className="text-pink-200">*</sup>{" "}
                    </p>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder="Enter last name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                    />
                </label>


                <label>
                    <p className=" text-richblack-5 text-sm mb-1">Email Address <sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] text-richblack-5"
                    />
                </label>


                <label className="relative">
                    <p className=" text-richblack-5 mb-1 text-sm">Create password <sup className=" text-pink-200">*</sup></p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none rounded-[0.5rem] text-sm bg-richblack-800 p-[9px] lg:p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[32px] z-[10] cursor-pointer"
                    >
                        {
                            showPassword ? (
                                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
                            )
                        }
                    </span>

                </label>

                <label className="relative">
                    <p className=" text-richblack-5 text-sm mb-1">Create confirm password <sup className=" text-pink-200">*</sup></p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Enter confirm Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full outline-none rounded-[0.5rem] text-sm bg-richblack-800 p-[9px] lg:p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[32px] z-[10] cursor-pointer"
                    >
                        {
                            showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={20} fill="#AFB2BF" />
                            )
                        }
                    </span>

                </label>


                <button
                    type="submit"
                    className="w-full font-semibold mt-6 rounded-md text-richblack-900 text-sm bg-[#a435f0] text-center px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200"
                >
                    Create Account
                </button>

            </form>

            <div className="flex items-center gap-2 text-sm mt-4">
                <p className=" text-richblack-5">Already have an account?</p>
                <NavLink to="/login">
                    <div className="flex items-center gap-1 text-[#1FA2FF] hover:underline">
                        <p>Sign in</p>
                        <AiOutlineCaretRight size={9} />
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Signup;
