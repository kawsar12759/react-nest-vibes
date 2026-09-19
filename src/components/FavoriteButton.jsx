import PropTypes from "prop-types";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { useFavorites } from "../providers/FavoritesProvider";

const FavoriteButton = ({ listing, className = "", withLabel = false }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const saved = isFavorite(listing.id);

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(listing);
            }}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${listing.title} from saved homes` : `Save ${listing.title}`}
            className={`inline-flex items-center justify-center gap-2 transition active:scale-90 ${className}`}
        >
            {saved ? <PiHeartFill className="text-coral" /> : <PiHeart />}
            {withLabel && <span>{saved ? "Saved" : "Save"}</span>}
        </button>
    );
};

FavoriteButton.propTypes = {
    listing: PropTypes.object.isRequired,
    className: PropTypes.string,
    withLabel: PropTypes.bool,
};

export default FavoriteButton;
