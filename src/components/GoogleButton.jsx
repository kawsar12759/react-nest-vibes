import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick, disabled, label = "Continue with Google" }) => (
    <>
        <button type="button" onClick={onClick} disabled={disabled} className="btn-ghost w-full !py-3">
            <FcGoogle className="text-xl" /> {label}
        </button>
        <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" /> or with email <span className="h-px flex-1 bg-line" />
        </div>
    </>
);

GoogleButton.propTypes = { onClick: PropTypes.func.isRequired, disabled: PropTypes.bool, label: PropTypes.string };

export default GoogleButton;
