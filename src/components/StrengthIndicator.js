import React from "react";

const StrengthIndicator = ({ passwordStrength, getStrengthColor }) => {
    return (
        <div className="str_container">
            <p className="str_styles">Strength</p>
            <p className={`poor_styles ${getStrengthColor()}`}>{passwordStrength}</p>
        </div>
    );
};

export default StrengthIndicator;
