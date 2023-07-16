import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import Slider from "./Slider";
import StrengthIndicator from "./StrengthIndicator";
import GenerateButton from "./GenerateButton";

const PasswordGenerator = () => {
    const [value, setValue] = useState(10);
    const [password, setPassword] = useState("");
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [generateClicked, setGenerateClicked] = useState(false);
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("Poor");

    useEffect(() => {
        if (generateClicked) {
            if (includeUppercase || includeLowercase || includeNumbers || includeSymbols) {
                generatePassword();
                setError("");
            } else {
                setPassword("");
                setError("Please select at least one checkbox.");
                setPasswordStrength("Poor");
            }
            setGenerateClicked(false);
        }
    }, [value, includeUppercase, includeLowercase, includeNumbers, includeSymbols, generateClicked]);

    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };

    const getSliderColor = () => {
        const percentage = (value - 1) / (100 - 1) * 100;
        const color = `linear-gradient(to right, #2a8b8b 0%, #2a8b8b ${percentage}%, #16161c ${percentage}%, #16161c 100%)`;
        return color;
    };

    const handleCopyClick = () => {
        navigator.clipboard
            .writeText(password)
            .then(() => {
                alert("Password copied to clipboard!");
            })
            .catch((error) => {
                alert("Failed to copy password: ", error);
            });
    };

    const handleCheckboxChange = (checkboxName) => {
        switch (checkboxName) {
            case "uppercase":
                setIncludeUppercase((prevIncludeUppercase) => !prevIncludeUppercase);
                break;
            case "lowercase":
                setIncludeLowercase((prevIncludeLowercase) => !prevIncludeLowercase);
                break;
            case "numbers":
                setIncludeNumbers((prevIncludeNumbers) => !prevIncludeNumbers);
                break;
            case "symbols":
                setIncludeSymbols((prevIncludeSymbols) => !prevIncludeSymbols);
                break;
            default:
                break;
        }
    };

    const handleGenerateClick = () => {
        setGenerateClicked(true);
    };

    const generatePassword = () => {
        let characters = "";
        if (includeUppercase) {
            characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if (includeLowercase) {
            characters += "abcdefghijklmnopqrstuvwxyz";
        }
        if (includeNumbers) {
            characters += "0123456789";
        }
        if (includeSymbols) {
            characters += "!@#$%^&*()";
        }

        let generatedPassword = "";
        for (let i = 0; i < value; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }

        setPassword(generatedPassword);
        checkPasswordStrength(generatedPassword);
    };

    const checkPasswordStrength = (password) => {
        if (password.length >= 15) {
            setPasswordStrength("Strong");
        } else if (password.length >= 9) {
            setPasswordStrength("Moderate");
        } else {
            setPasswordStrength("Weak");
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case "Weak":
                return "red";
            case "Moderate":
                return "orange";
            case "Strong":
                return "green";
            default:
                return "";
        }
    };

    return (
        <>
            <div className="top">
                <p className="gen_pass">{password ? password : "Generate New Password"}</p>
                <div>
                    <span className="material-symbols-outlined" onClick={handleCopyClick}>
                        file_copy
                    </span>
                </div>
            </div>

            <Slider
                value={value}
                onChange={handleSliderChange}
                getSliderColor={getSliderColor}
            />

            <div className="check_container">
                <Checkbox
                    title="Include Uppercase Letters"
                    checked={includeUppercase}
                    onChange={() => handleCheckboxChange("uppercase")}
                />
                <Checkbox
                    title="Include Lowercase Letters"
                    checked={includeLowercase}
                    onChange={() => handleCheckboxChange("lowercase")}
                />
                <Checkbox
                    title="Include Numbers"
                    checked={includeNumbers}
                    onChange={() => handleCheckboxChange("numbers")}
                />
                <Checkbox
                    title="Include Symbols"
                    checked={includeSymbols}
                    onChange={() => handleCheckboxChange("symbols")}
                />
            </div>

            {error && <p className="error">{error}</p>}

            <StrengthIndicator
                passwordStrength={passwordStrength}
                getStrengthColor={getStrengthColor}
            />

            <GenerateButton onClick={handleGenerateClick} />

        </>
    );
};

export default PasswordGenerator;
