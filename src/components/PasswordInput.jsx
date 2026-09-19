import { useState } from "react";
import PropTypes from "prop-types";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const PasswordInput = ({ id, ...props }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input id={id} type={visible ? "text" : "password"} className="field !pr-12" {...props} />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-lg text-muted hover:text-ink"
                aria-label={visible ? "Hide password" : "Show password"}
            >
                {visible ? <PiEyeSlash /> : <PiEye />}
            </button>
        </div>
    );
};

PasswordInput.propTypes = { id: PropTypes.string };

export default PasswordInput;
