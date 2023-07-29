import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <div className="bg-[#000814] w-[100%] h-screen flex flex-col gap-9 items-center border-[1px]">
            <div className="flex flex-col items-center gap-2">
                <p className=" text-richblack-5 text-xl md:text-2xl font-semibold mt-5">
                    Welcome back
                </p>
                <p className=" font-edu-sa text-[#1FA2FF] font-semibold">Be unstoppable</p>
            </div>

            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col gap-3 w-[300px] lg:w-[400px]"
            >
                <label>
                    <p className="mb-1 text-sm text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
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
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Password <sup className="text-pink-200">*</sup>
                    </p>
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
                        className="w-full outline-none text-sm rounded-[0.5rem] bg-richblack-800 p-[9px] lg:p-[12px] pr-12 text-richblack-5"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={20} fill="#AFB2BF" />
                        )}
                    </span>
                </label>

                <div className=" text-right">
                    <NavLink to="/forgot-password">
                        <p className="text-xs text-[#1FA2FF] hover:underline">Forgot password?</p>
                    </NavLink>
                </div>

                <button
                    type="submit"
                    className="mt-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"
                >
                    Sign In
                </button>
            </form>

            <div className="flex flex-col items-center">
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-px my-8 bg-richblack-600 border-0" />
                    <span class="absolute px-1 text-sm text-gray-900 bg-[#000814] -translate-x-1/2 text-richblack-5 left-1/2">
                        New to StudySkill?
                    </span>
                </div>

                <div className="border-[1px] border-richblack-600 rounded-md hover:scale-95 transition-all duration-200">
                    <NavLink to="/signup">
                        <p className=" text-richblack-5 px-5 py-2 text-sm">
                            Create your StudySkill account
                        </p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;



