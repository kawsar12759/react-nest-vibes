import { useState } from "react";
import PropTypes from "prop-types";
import { cld } from "../lib/cloudinary";
import { initials } from "../lib/format";

const Avatar = ({ src, name, size = 40, className = "" }) => {
    const [failed, setFailed] = useState(false);
    const style = { width: size, height: size };

    if (!src || failed) {
        return (
            <span
                style={{ ...style, fontSize: size * 0.38 }}
                className={`inline-flex shrink-0 items-center justify-center rounded-full bg-plum-soft font-bold text-plum ${className}`}
                aria-label={name}
            >
                {initials(name)}
            </span>
        );
    }
    return (
        <img
            src={cld(src, { w: size * 2, h: size * 2 })}
            alt={name}
            style={style}
            onError={() => setFailed(true)}
            className={`shrink-0 rounded-full object-cover ${className}`}
        />
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default Avatar;
