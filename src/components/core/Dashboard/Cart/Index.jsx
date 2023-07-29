import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart)
    const { paymentLoading } = useSelector((state) => state.course)

    if (paymentLoading)
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="spinner"></div>
            </div>
        )

    return (
        <>
            <div className='flex items-center gap-1 text-sm mb-3'>
                <p className=' text-richblack-300'>Home/</p>
                <p className=' text-richblack-300'>Dashboard/</p>
                <p className=' text-[#a435f0] font-semibold'>My cart</p>
            </div>
            <h1 className="mb-14 text-2xl font-medium text-richblack-25">Cart</h1>
            <p className="border-b-[1px] border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} Courses in Cart
            </p>
            {total > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-14 text-center text-2xl text-richblack-100">
                    Your cart is empty
                </p>
            )}
        </>
    )
}
