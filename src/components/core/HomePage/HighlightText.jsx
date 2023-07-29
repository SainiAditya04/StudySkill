import React from "react";

const HighlightText = ({ text }) => {
    return (
        <div className="w-fit text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-[#1FA2FF] to-[#12D8FA] bg-clip-text">
            {text}
        </div>
    );
};

export default HighlightText;
