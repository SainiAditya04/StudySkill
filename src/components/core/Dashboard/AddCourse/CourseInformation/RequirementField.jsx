import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function RequirementsField({
    name,
    label,
    register,
    setValue,
    errors,
    getValues,
}) {
    const { editCourse, course } = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions);
        }
        register(name, { required: true, validate: (value) => value.length > 0 });
    }, []);

    useEffect(() => {
        setValue(name, requirementsList);
    }, [requirementsList]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementsList];
        updatedRequirements.splice(index, 1);
        setRequirementsList(updatedRequirements);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-[#a435f0]"
                >
                    Add
                </button>
            </div>
            {requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementsList.map((requirement, index) => (
                        <li key={index} className="flex items-center font-semibold text-richblack-100">
                            <span>{requirement}</span>
                            <button
                                type="button"
                                className="ml-2 text-sm font-bold text-pure-greys-400 "
                                onClick={() => handleRemoveRequirement(index)}
                            >
                                <AiOutlineClose size={16}/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    );
}
