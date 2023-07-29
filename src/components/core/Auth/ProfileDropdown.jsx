import React, { useRef, useState } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { TbLayoutDashboard } from "react-icons/tb"
import { PiSignOutBold } from "react-icons/pi"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null

  return (
    <button className='relative' onClick={() => setOpen((prev) => !prev)}>

      {/* user image */}
      <div className='flex items-center gap-2'>
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='object-cover h-[37px] w-[37px] rounded-full'
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />

      </div>

      {/* dropdown menu */}
      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
            ref={ref}
          >

            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <TbLayoutDashboard size={20} />
                Dashboard
              </div>
            </Link>

            <div
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"

            >
              <PiSignOutBold />
              Log out
            </div>

          </div>
        )
      }
    </button>
  )
}

export default ProfileDropdown
