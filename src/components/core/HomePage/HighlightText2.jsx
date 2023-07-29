import React from "react";

const HighlightText2 = ({ text }) => {
    return (
        <div className=" text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-[#D43D63] to-[#F37290] bg-clip-text">
            {text}
        </div>
    );
};

export default HighlightText2;
