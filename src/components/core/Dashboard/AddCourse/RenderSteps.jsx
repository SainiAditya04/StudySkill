import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import PublishCourse from "./PublishCourse/Index"


export default function RenderSteps() {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]

    return (
        <>
            <div className="relative mb-2 flex w-full justify-center">

                {/* The step number */}
                {steps.map((item) => (
                    <>
                        <div
                            className="flex flex-col items-center "
                            key={item.id}
                        >
                            <button
                                className={`grid cursor-default aspect-square font-semibold w-[34px] place-items-center rounded-full border-[2px] ${step === item.id
                                        ? "border-[#a435f0]  text-[#a435f0]"
                                        : "border-richblack-700 bg-[#a435f0] text-richblack-300"
                                    } ${step < item.id && " bg-richblack-800 text-richblack-300"}} `}
                            >
                                {step > item.id ? (
                                    <FaCheck className="font-bold bg-[#a435f0] border-[#a435f0] text-richblack-900" />
                                ) : (
                                    item.id
                                )}
                            </button>

                            {/* {the dotted line between steps} */}
                        </div>
                        {item.id !== steps.length && (
                            <>
                                <div
                                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > item.id ? "border-[#a435f0]" : "border-richblack-500"
                                        } `}
                                ></div>
                            </>
                        )}
                    </>
                ))}
            </div>

            {/* title of the step number */}
            <div className="relative mb-16 flex w-full select-none justify-between">
                {steps.map((item) => (
                    <>
                        <div
                            className="flex min-w-[130px] flex-col items-center gap-y-2"
                            key={item.id}
                        >

                            <p
                                className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                    }`}
                            >
                                {item.title}
                            </p>
                        </div>

                    </>
                ))}
            </div>

            {/* Render specific component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}