import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import { AiFillLock } from "react-icons/ai"

export default function RenderTotalAmount() {
  const { total, cart, totalItems } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-xl font-medium text-richblack-100">Subtotal:</p>
      <p className="mb-1 text-sm font-medium text-richblack-300">Total: {totalItems} item</p>
      <p className="mb-6 text-xl font-medium text-[#a435f0]">₹ {total}</p>

      <div className="flex flex-col items-center gap-2">
        <IconBtn
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses="w-full justify-center"
        />

        <div className="flex items-center text-caribbeangreen-200 text-sm font-semibold">
          <AiFillLock size={18} />
          <p>Secure checkout</p>
        </div>
      </div>

    </div>
  )
}
