import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
      <div className='flex items-center gap-1 text-sm mb-3'>
        <p className=' text-richblack-300'>Home/</p>
        <p className=' text-richblack-300'>Dashboard/</p>
        <p className=' text-[#a435f0] font-semibold'>Settings</p>
      </div>
      <h1 className="mb-14 text-2xl font-medium text-richblack-25">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />

      {/* Profile */}
      <EditProfile />

      {/* Password */}
      <UpdatePassword />

      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}