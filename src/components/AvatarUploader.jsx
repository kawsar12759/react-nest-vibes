import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PiCamera } from "react-icons/pi";
import { ACCEPT_ATTR, uploadImage, validateImage } from "../lib/cloudinary";
import Avatar from "./Avatar";

/** Circular profile-photo picker that uploads to Cloudinary and reports the hosted URL. */
const AvatarUploader = ({ value, name, onChange, onBusyChange, size = 104 }) => {
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

    const handleFile = async (file) => {
        if (!file) return;
        const problem = validateImage(file);
        if (problem) {
            setError(problem);
            return;
        }
        setError("");
        setPreview(URL.createObjectURL(file));
        setProgress(0);
        onBusyChange?.(true);
        try {
            const { url } = await uploadImage(file, { tags: ["avatar"], onProgress: setProgress });
            onChange(url);
        } catch (err) {
            setError(err.message);
            setPreview(null);
        } finally {
            setProgress(null);
            onBusyChange?.(false);
        }
    };

    const ring = 2 * Math.PI * 48;

    return (
        <div className="flex items-center gap-5">
            <label className="group relative cursor-pointer rounded-full" style={{ width: size, height: size }}>
                {preview ? (
                    <img src={preview} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                    <Avatar src={value} name={name || "You"} size={size} />
                )}
                {progress !== null && (
                    <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
                        <circle cx="50" cy="50" r="48" className="fill-none stroke-surface/70" strokeWidth="4" />
                        <circle
                            cx="50" cy="50" r="48"
                            className="fill-none stroke-plum transition-[stroke-dashoffset]"
                            strokeWidth="4" strokeLinecap="round"
                            strokeDasharray={ring} strokeDashoffset={ring - (ring * progress) / 100}
                        />
                    </svg>
                )}
                <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-plum text-plum-ink shadow-lift transition group-hover:scale-110">
                    <PiCamera />
                </span>
                <input type="file" accept={ACCEPT_ATTR} className="sr-only" onChange={(e) => handleFile(e.target.files?.[0])} />
                <span className="sr-only">Upload profile photo</span>
            </label>
            <div className="text-sm">
                <p className="font-bold">{progress !== null ? `Uploading… ${progress}%` : "Profile photo"}</p>
                <p className="text-muted">{error ? <span className="text-danger">{error}</span> : "JPG, PNG or WebP, up to 8 MB."}</p>
            </div>
        </div>
    );
};

AvatarUploader.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBusyChange: PropTypes.func,
    size: PropTypes.number,
};

export default AvatarUploader;
