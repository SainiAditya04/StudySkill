// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AiOutlineMenuUnfold } from "react-icons/ai"
// import { FiEdit } from "react-icons/fi"
// import { RiDeleteBinLine } from "react-icons/ri"
// import { AiFillCaretDown } from 'react-icons/ai'
// import { FaPlus } from 'react-icons/fa'
// import ConfirmationModal from '../../../../common/ConfirmationModal'
// import SubSectionModal from './SubSectionModal'
// import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
// import { setCourse } from '../../../../../slices/courseSlice'

// const NestedView = ({ handleChangeEditSectionName }) => {
//     const { course } = useSelector((state) => state.course);
//     const { token } = useSelector((state) => state.auth);

//     const dispatch = useDispatch();

//     const [addSubSection, setAddSubSection] = useState(null);
//     const [viewSubSection, setViewSubSection] = useState(null);
//     const [editSubSection, setEditSubSection] = useState(null);
//     const [confirmationModal, setConfirmationModal] = useState(null);

//     const handleDeleteSection = async (sectionId) => {
//         const result = await deleteSection({
//             sectionId,
//             courseId: course._id,
//             token
//         })

//         if (result) {
//             dispatch(setCourse(result));
//         }
//         setConfirmationModal(null);
//     }

//     const handleDeleteSubSection = async (subSectionId, sectionId) => {
//         const result = await deleteSubSection({
//             sectionId,
//             subSectionId,
//             token
//         });

//         if (result) {
//             // update the structure of course
//             const updatedCourseContent = course.courseContent.map((section) =>
//                 section._id === sectionId ? result : section
//             )
//             const updatedCourse = { ...course, courseContent: updatedCourseContent }
//             dispatch(setCourse(updatedCourse))
//         }

//         setConfirmationModal(null);
//     }

//     return (
//         <div>

//             <div className="rounded-lg bg-richblack-700 p-6 px-8"
//                 id="nestedViewContainer">
//                 {
//                     course?.courseContent?.map((section, index) => (
//                         // section dropdown
//                         <details key={section._id}>
//                             {/* section dropdown details  */}
//                             <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
//                                 <div className="flex items-center gap-x-1 text-richblack-50">
//                                     <AiOutlineMenuUnfold size={20} />
//                                     <p className="font-semibold text-richblack-50">{section.sectionName}</p>
//                                 </div>

//                                 <div className="flex items-center gap-x-3">
//                                     <button
//                                         onClick={() =>
//                                             handleChangeEditSectionName(
//                                                 section._id,
//                                                 section.sectionName
//                                             )
//                                         }
//                                     >
//                                         <FiEdit className="text-xl text-richblack-300" />
//                                     </button>
//                                     <button
//                                         onClick={() =>
//                                             setConfirmationModal({
//                                                 text1: "Delete this Section?",
//                                                 text2: "All the lectures in this section will be deleted!",
//                                                 btn1Text: "Delete",
//                                                 btn2Text: "Cancel",
//                                                 btn1Handler: () => handleDeleteSection(section._id),
//                                                 btn2Handler: () => setConfirmationModal(null),
//                                             })
//                                         }
//                                     >
//                                         <RiDeleteBinLine className="text-xl text-richblack-300" />
//                                     </button>
//                                     <span className="font-sm text-richblack-300">|</span>
//                                     <AiFillCaretDown className={`text-[14px] text-richblack-300`} />
//                                 </div>
//                             </summary>

//                             {/* Render sub section details within a section  */}
//                             <div className="px-6 pb-4">
//                                 {
//                                     section?.subSection?.map((data) => {
//                                         <div
//                                             key={data._id}
//                                             onClick={() => setViewSubSection(data)}
//                                             className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
//                                         >
//                                             <div className="flex items-center gap-x-3 py-2 ">
//                                                 <AiOutlineMenuUnfold size={20} />
//                                                 <p className="font-semibold text-richblack-50">{data.title}</p>
//                                             </div>

//                                             <div
//                                                 onClick={(e) => e.stopPropagation()}
//                                                 className="flex items-center gap-x-3"
//                                             >
//                                                 <button
//                                                     onClick={() =>
//                                                         setEditSubSection({ ...data, sectionId: section._id })
//                                                     }
//                                                 >
//                                                     <FiEdit className="text-xl text-richblack-300" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() =>
//                                                         setConfirmationModal({
//                                                             text1: "Delete this Lecture?",
//                                                             text2: "This lecture will be deleted permanently",
//                                                             btn1Text: "Delete",
//                                                             btn2Text: "Cancel",
//                                                             btn1Handler: () =>
//                                                                 handleDeleteSubSection(data._id, section._id),
//                                                             btn2Handler: () => setConfirmationModal(null),
//                                                         })
//                                                     }
//                                                 >
//                                                     <RiDeleteBinLine className="text-xl text-richblack-300" />
//                                                 </button>
//                                             </div>
//                                         </div>

//                                     })
//                                 }

//                                 {/* add new lecture or sub section to a section */}
//                                 <button
//                                     onClick={() => setAddSubSection(section._id)}
//                                     className="mt-3 flex items-center gap-x-1 text-[#a435f0]"
//                                 >
//                                     <FaPlus size={16} className="text-lg" />
//                                     <p className=' font-bold text-sm'>Add Lecture</p>
//                                 </button>

//                             </div>
//                         </details>
//                     ))
//                 }
//             </div>

//             {/* Show Modals */}
//             {
//                 addSubSection ? (
//                     <SubSectionModal
//                         modalData={addSubSection}
//                         setModalData={setAddSubSection}
//                         add={true}
//                     />
//                 ) : viewSubSection ? (
//                     <SubSectionModal
//                         modalData={viewSubSection}
//                         setModalData={setViewSubSection}
//                         add={true}
//                     />
//                 ) : editSubSection ? (
//                     <SubSectionModal
//                         modalData={editSubSection}
//                         setModalData={setEditSubSection}
//                         add={true}
//                     />
//                 ) : (
//                     <div></div>
//                 )
//             }

//             {/* Confirmation Modal  */}
//             {
//                 confirmationModal ? (
//                     <ConfirmationModal modalData={confirmationModal} />
//                 ) : (
//                     <div></div>
//                 )
//             }

//         </div>

//     )
// }

// export default NestedView



import { useState } from "react"
import { AiFillCaretDown, AiOutlineMenuUnfold } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { GoVideo } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux"

import {
    deleteSection,
    deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    // States to keep track of mode of modal [add, view, edit]
    const [addSubSection, setAddSubsection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleleSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

    return (
        <>
            <div
                className="rounded-lg bg-richblack-700 p-6 px-8"
                id="nestedViewContainer"
            >
                {course?.courseContent?.map((section) => (
                    // Section Dropdown
                    <details key={section._id} open>
                        {/* Section Dropdown Content */}
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <AiOutlineMenuUnfold className="text-[18px] text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <FiEdit className="text-xl text-richblack-300" />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleleSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>

                        </summary>

                        <div className="px-6 pb-4">
                            {/* Render All Sub Sections Within a Section */}
                            {section.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    <div className="flex items-center gap-x-3 py-2 ">
                                        <GoVideo className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-[15px] text-richblack-50">
                                            {data.title}
                                        </p>
                                    </div>

                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-x-3"
                                    >
                                        <button
                                            onClick={() =>
                                                setEditSubSection({ ...data, sectionId: section._id })
                                            }
                                        >
                                            <FiEdit className="text-xl text-richblack-300" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Lecture?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Lecture to Section */}
                            <button
                                onClick={() => setAddSubsection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-[#a435f0]"
                            >
                                <FaPlus className=" font-bold" />
                                <p className=" text-sm font-bold">Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Modal Display */}
            {addSubSection ? (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubsection}
                    add={true}
                />
            ) : viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (
                <></>
            )}
            {/* Confirmation Modal */}
            {confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal} />
            ) : (
                <></>
            )}
        </>
    )
}