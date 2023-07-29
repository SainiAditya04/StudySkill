import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { toast } from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io"
import { AiOutlineReload } from "react-icons/ai"


const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        // if the user has filled the sign up form,
        // only then he can access this page
        if (!signupData) {
            navigate("/signup");
            toast.error("Sign up failure!");
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            ),
        );
    };

    return (
        <div className="bg-[#000814] w-[100%] h-screen flex flex-col gap-9 items-center border-[1px]">
            {loading ? (
                <div className=" text-black">Loading...</div>
            ) : (
                <div className="flex flex-col items-center mt-10 md:mt-20">
                    <div className="flex flex-col items-center gap-2">
                        <p className=" text-richblack-5 text-xl md:text-2xl font-semibold mt-5">
                            Verify email
                        </p>
                        <p className='text-sm text-richblack-400 font-semibold text-center w-[300px] md:w-fit'>A verification code has been sent on your registered email.</p>
                    </div>
                    <form onSubmit={handleOnSubmit} className="w-[280px] md:w-[420px] flex flex-col items-center justify-center mt-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[40px] md:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center outline-none focus:outline-[#a435f0]"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 4px"
                            }}
                        />

                        <button type="submit" className="my-5 rounded-md  text-richblack-900 font-semibold px-2 lg:px-4 py-2 lg:py-2 hover:scale-95 transition-all duration-200 text-sm bg-[#a435f0] text-center"
                        >Verify email</button>
                    </form>

                    <div className="flex justify-between text-sm w-[280px] md:w-[420px]">
                        <div>
                            <Link to="/signup" className="flex gap-1 items-center">
                                <IoIosArrowRoundBack color="white" size={20} />
                                <p className=" text-richblack-5">Back to Sign Up</p>
                            </Link>
                        </div>

                        <button
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                            className="flex gap-1 items-center"
                        >
                            <AiOutlineReload color="#47A5C5" />
                            <p className=" text-blue-100">Resend it</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
