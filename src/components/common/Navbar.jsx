import React, { useEffect, useState } from "react";
import studyskillwhite from "../../assets/Images/StudySkillWhite.png";
import { Link, NavLink, matchPath, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { BsBook, BsChevronDown } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineHome, AiOutlineMenu, AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiArrowDropDownFill, RiArrowDropDownLine, RiArrowDropUpLine, RiArrowUpDownLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const navigate = useNavigate();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMenuBar, setShowMenuBar] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                setSubLinks(res.data.data);
            } catch (error) {
                console.log("Could not fetch Categories.", error);
            }
            setLoading(false);
        })();
    }, []);

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    function homeHandler() {
        navigate("/");
        setShowMenuBar(false);
    }
    function aboutHandler() {
        navigate("/about");
        setShowMenuBar(false);
    }
    function contactHandler() {
        navigate("/contact");
        setShowMenuBar(false);
    }
    function pythonHandler() {
        navigate("/catalog/python");
        setShowMenuBar(false);
    }
    function webHandler() {
        navigate("/catalog/web-development");
        setShowMenuBar(false);
    }
    function androidHandler() {
        navigate("/catalog/android-development");
        setShowMenuBar(false);
    }
    function aiHandler() {
        navigate("/catalog/artificial-intelligence");
        setShowMenuBar(false);
    }
    function cyberHandler() {
        navigate("/catalog/cybersecurity");
        setShowMenuBar(false);
    }
    function cloudHandler() {
        navigate("/catalog/cloud-computing");
        setShowMenuBar(false);
    }
    function uiHandler() {
        navigate("/catalog/ui-ux-design");
        setShowMenuBar(false);
    }
    function dataHandler() {
        navigate("/catalog/data-structure-and-algorithm");
        setShowMenuBar(false);
    }
    function loginHandler() {
        navigate("/login");
        setShowMenuBar(false);
    }
    function signupHandler() {
        navigate("/signup");
        setShowMenuBar(false);
    }
    function profileHandler() {
        navigate("/dashboard/my-profile");
        setShowMenuBar(false);
    }
    function enrolledHandler() {
        navigate("/dashboard/enrolled-courses");
        setShowMenuBar(false);
    }
    function cartHandler() {
        navigate("/dashboard/cart");
        setShowMenuBar(false);
    }


    return (
        <div
            className={`flex h-[45px] md:h-[55px] items-center justify-center bg-richblack-900 border-b-[1px] border-b-richblack-800 ${location.pathname !== "/" ? "bg-richblack-800" : ""
                } transition-all duration-200`}
        >
            <div className="flex w-11/12 relative max-w-maxContent items-center justify-between">
                {/* Logo */}
                <NavLink to="/">
                    <img
                        src={studyskillwhite}
                        alt=""
                        className="object-contain w-[130px] lg:w-[145px]"
                    />
                </NavLink>

                {/* Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                                ? "text-[#a435f0]"
                                                : "text-richblack-25"
                                                }`}
                                        >
                                            <p>{link.title}</p>
                                            <BsChevronDown size={15} />
                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] border-[1px] border-richblack-700 flex w-[200px] lg:w-[250px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-800 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 border-t-[1px] border-l-[1px] border-richblack-700 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-800"></div>
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks.length ? (
                                                    <>
                                                        {subLinks?.map((subLink, i) => (
                                                            <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="bg-transparent border-b-[1px] border-richblack-700 flex items-center justify-center py-3 hover:bg-richblack-700"
                                                                key={i}
                                                            >
                                                                <p className=" text-richblack-25 text-sm">{subLink.name}</p>
                                                            </Link>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p
                                            className={`${matchRoute(link?.path)
                                                ? "text-[#a435f0] font-semibold"
                                                : "text-richblack-25 font-semibold"
                                                }`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard */}
                <div className="hidden items-center gap-x-4 md:flex">
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-[#a435f0] text-center text-xs font-bold text-richblack-900">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 text-sm px-[9px] py-[5px] text-richblack-100">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 text-sm px-[9px] py-[5px] text-richblack-100">
                                Sign up
                            </button>
                        </Link>
                    )}
                    {token !== null && <ProfileDropdown />}
                </div>

                {
                    showMenuBar &&
                    <div className="fixed inset-0 z-[1000] !mt-0 flex flex-row-reverse overflow-auto bg-white bg-opacity-10 backdrop-blur-sm  transition duration-500 ease-in">
                        <div className="w-11/12 max-w-[300px] flex flex-col items-start justify-between border border-l-richblack-700 bg-richblack-800 transition duration-500 ease-in">

                            <div>
                                <div
                                    className=" text-richblack-400 w-[300px] font-semibold text-[15px] flex items-center justify-between gap-2 border-b-[1px] py-5 px-2 border-richblack-600"
                                >
                                    <div className="flex items-center gap-2" onClick={() => setShowMenuBar(false)}>
                                        <IoIosArrowRoundBack size={30} />
                                        <p>Back</p>
                                    </div>

                                    {
                                        user &&
                                        <div className=" mx-5">
                                            <ProfileDropdown />
                                        </div>
                                    }
                                </div>

                                <div className=" text-richblack-400 text-[17px] flex flex-col gap-4 items-start p-6 w-[300px]">
                                    <div
                                        onClick={homeHandler}
                                        className="flex items-center gap-2"
                                    >
                                        <AiOutlineHome size={20} />
                                        <p>Home</p>
                                    </div>

                                    <div
                                        onClick={aboutHandler}
                                        className="flex items-center gap-2"
                                    >
                                        <FiUser size={20} />
                                        <p>About us</p>
                                    </div>

                                    <div
                                        onClick={contactHandler}
                                        className="flex items-center gap-2"
                                    >
                                        <AiOutlinePhone size={20} />
                                        <p>Contact us</p>
                                    </div>

                                    {/* catalog */}
                                    <div
                                        className="flex flex-col gap-3"
                                    >
                                        <div
                                            className="flex items-center gap-2"
                                            onClick={() => setShowCatalog((prev) => !prev)}
                                        >
                                            <BsBook size={20} />
                                            <p>Catalog</p>
                                            {
                                                showCatalog ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />
                                            }
                                        </div>
                                        {
                                            showCatalog &&
                                            <div className="text-[15px] w-[300px] flex flex-col gap-5 items-start px-8 text-richblack-300">
                                                <div
                                                    onClick={pythonHandler}
                                                >
                                                    <p>Python</p>
                                                </div>
                                                <div
                                                    onClick={webHandler}
                                                >
                                                    <p>Web Development</p>
                                                </div>
                                                <div
                                                    onClick={androidHandler}
                                                >
                                                    <p>Android Development</p>
                                                </div>
                                                <div
                                                    onClick={aiHandler}
                                                >
                                                    <p>Artificial Intelligence</p>
                                                </div>
                                                <div
                                                    onClick={cyberHandler}
                                                >
                                                    <p>Cybersecurity</p>
                                                </div>
                                                <div
                                                    onClick={cloudHandler}
                                                >
                                                    <p>Cloud Computing</p>
                                                </div>
                                                <div
                                                    onClick={uiHandler}
                                                >
                                                    <p>UI UX Design</p>
                                                </div>
                                                <div
                                                    onClick={dataHandler}
                                                >
                                                    <p>Data Structure and Algorithm</p>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {/* profile */}
                                    {
                                        user &&
                                        <div
                                            className="flex flex-col gap-3"
                                        >
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={() => setShowProfile((prev) => !prev)}
                                            >
                                                <BiUserCircle size={25} />
                                                <p>Profile</p>
                                                {
                                                    showProfile ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />
                                                }
                                            </div>
                                            {
                                                showProfile &&
                                                <div className="text-[15px] w-[300px] flex flex-col gap-5 items-start px-8 text-richblack-300">
                                                    <div
                                                        onClick={profileHandler}
                                                    >
                                                        <p>My Account</p>
                                                    </div>
                                                    {
                                                        user.ACCOUNT_TYPE !== "INSTRUCTOR" &&
                                                        <div className="text-[15px] flex flex-col gap-5 items-start text-richblack-300">
                                                            <div
                                                                onClick={enrolledHandler}
                                                            >
                                                                <p>Enrolled Courses</p>
                                                            </div>
                                                            <div
                                                                onClick={cartHandler}
                                                            >
                                                                <p>My Cart</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }

                                </div>
                            </div>

                            {/* log in sign up  */}
                            {
                                token === null &&
                                <div className="flex items-center justify-center gap-4 my-5 w-[300px] text-richblack-300">
                                    <div className=" bg-richblack-900 px-3 py-2 rounded-md text-[15px]" onClick={loginHandler}>Log In</div>
                                    <div className=" bg-richblack-900 px-3 py-2 rounded-md text-[15px]" onClick={signupHandler}>Sign Up </div>
                                </div>
                            }
                        </div>
                    </div>
                }

                <button
                    className="mr-4 md:hidden"
                    onClick={() => setShowMenuBar(true)}
                >
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
