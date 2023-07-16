import React from "react";

const Slider = ({ value, onChange, getSliderColor }) => {
    return (
        <div className="slide_container">
            <div className="char_box">
                <p className="char_len">Character Length</p>
                <p className="char_num">{value}</p>
            </div>
            <input
                type="range"
                min="1"
                max="100"
                value={value}
                className="slider"
                id="myRange"
                onChange={onChange}
                style={{ background: getSliderColor() }}
            />
        </div>
    );
};

export default Slider;
