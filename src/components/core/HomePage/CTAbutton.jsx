import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center py-2 px-3 lg:px-4 rounded-md text-sm font-semibold text-white
        ${active? "bg-[#a435f0] text-black" : "bg-richblack-800 text-white"} hover:scale-95 transition-all duration-150`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAbutton
