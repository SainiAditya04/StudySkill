import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { IoAddCircleOutline } from "react-icons/io5"
import NestedView from './NestedView'
import { MdNavigateNext } from 'react-icons/md'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import { toast } from 'react-hot-toast'


const CourseBuilderForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch();

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    const [loading, setLoading] = useState(false)
    const [editSectionName, setEditSectionName] = useState(null);

    const onSubmit = async (data) => {
        // we are here because we have pressed either Edit section name
        // or create section
        setLoading(true);
        let result;
        // if we have pressed Edit Section name 
        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            )
        } else {
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id,
                },
                token
            )
        }

        if (result) {
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName", "")
        }
        setLoading(false)
    }

    const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section!")
            return;
        }
        if (
            course.courseContent.some((section) => section.subSection.length === 0)
        ) {
            toast.error("Please add atleast one lecture in each section!")
            return;
        }
        // you can go to publish course
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Add a section to your course"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    )}
                </div>

                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-[#a435f0]" />
                    </IconBtn>
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

            </form>

            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
            }

            {/* Next and Prev Button */}
            <div className="flex justify-end gap-x-3">
                <button
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] text-sm font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onclick={goToNext}>
                    <MdNavigateNext size={20} />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm
