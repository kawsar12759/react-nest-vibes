import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ArchMark = ({ className = "h-8 w-8" }) => (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-plum" />
        <path d="M9 25V15a7 7 0 0 1 14 0v10" className="stroke-plum-ink" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M16 11v14M9.5 18h13" className="stroke-plum-ink" strokeWidth="1.6" strokeLinecap="round" opacity=".55" fill="none" />
        <circle cx="24.5" cy="8" r="2.5" className="fill-coral" />
    </svg>
);

const Logo = ({ className = "" }) => (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="NestVibes home">
        <ArchMark />
        <span className="font-display text-[1.45rem] font-semibold tracking-tight">
            Nest<span className="italic font-normal text-plum">Vibes</span>
        </span>
    </Link>
);

ArchMark.propTypes = { className: PropTypes.string };
Logo.propTypes = { className: PropTypes.string };

export default Logo;
