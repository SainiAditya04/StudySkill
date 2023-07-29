import React, { useEffect, useState } from "react";
import studyskillwhite from "../../assets/Images/StudySkillWhite.png";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

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

    console.log(subLinks);

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div
            className={`flex h-[45px] md:h-[55px] items-center justify-center bg-richblack-900 border-b-[1px] border-b-richblack-800 ${location.pathname !== "/" ? "bg-richblack-800" : ""
                } transition-all duration-200`}
        >
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
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

                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
