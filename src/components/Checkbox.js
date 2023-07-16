import React from "react";

const Checkbox = ({ title, checked, onChange }) => {
    return (
        <div className="checkbox-label">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <label className="check_styles">{title}</label>
        </div>
    );
};

export default Checkbox;
