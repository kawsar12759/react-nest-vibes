import PropTypes from "prop-types";
import { PiStarFill, PiStarHalfFill, PiStar } from "react-icons/pi";

const Stars = ({ rating, className = "text-coral" }) => (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) =>
            rating >= n ? <PiStarFill key={n} /> : rating >= n - 0.5 ? <PiStarHalfFill key={n} /> : <PiStar key={n} className="opacity-40" />
        )}
    </span>
);

Stars.propTypes = { rating: PropTypes.number.isRequired, className: PropTypes.string };

export default Stars;
