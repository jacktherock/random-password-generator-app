import React from "react";

const GenerateButton = ({ onClick }) => {
    return (
        <div className="gen_container">
            <button className="gen_styles" onClick={onClick}>
                Generate
            </button>
        </div>
    );
};

export default GenerateButton;
