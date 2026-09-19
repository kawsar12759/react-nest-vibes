import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PiBed, PiBathtub, PiRuler, PiMapPin } from "react-icons/pi";
import { cld, cldSrcSet } from "../lib/cloudinary";
import { formatArea, formatPrice } from "../lib/format";
import FavoriteButton from "./FavoriteButton";

const PropertyCard = ({ property, style }) => {
    const { id, title, images, price, priceUnit, category, status, location, bedrooms, washrooms, area, source } = property;
    const cover = images?.[0]?.url;

    return (
        <article style={style} className="group relative flex flex-col animate-rise">
            <Link to={`/property/${id}`} className="relative block overflow-hidden rounded-card bg-sunken">
                <img
                    src={cld(cover, { w: 800, h: 600 })}
                    srcSet={cldSrcSet(cover, [400, 640, 800], 0.75)}
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
                    alt={title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute left-3 top-3 flex gap-1.5">
                    <span
                        className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${
                            status === "Sale" ? "bg-coral text-white" : "bg-surface/95 text-ink"
                        }`}
                    >
                        For {status.toLowerCase()}
                    </span>
                    {source === "community" && (
                        <span className="rounded-full bg-plum/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-plum-ink">
                            New
                        </span>
                    )}
                </div>
                <span className="sr-only">View {title}</span>
            </Link>
            <FavoriteButton
                listing={property}
                className="absolute right-3 top-3 h-10 w-10 rounded-full bg-surface/95 text-xl text-ink shadow-lift hover:scale-105"
            />

            <div className="flex flex-1 flex-col px-1 pt-4">
                <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-2xl font-semibold tracking-tight">{formatPrice(price, priceUnit)}</p>
                    <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">{category}</p>
                </div>
                <h3 className="mt-1 text-base font-bold leading-snug">
                    <Link to={`/property/${id}`} className="hover:text-plum">
                        {title}
                    </Link>
                </h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                    <PiMapPin className="shrink-0" /> {location}
                </p>
                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-sm text-muted">
                    <div className="flex items-center gap-1.5">
                        <PiBed className="text-lg" />
                        <dt className="sr-only">Bedrooms</dt>
                        <dd><b className="text-ink">{bedrooms}</b> bd</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <PiBathtub className="text-lg" />
                        <dt className="sr-only">Bathrooms</dt>
                        <dd><b className="text-ink">{washrooms}</b> ba</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <PiRuler className="text-lg" />
                        <dt className="sr-only">Area</dt>
                        <dd>{formatArea(area)}</dd>
                    </div>
                </dl>
            </div>
        </article>
    );
};

export const PropertyCardSkeleton = () => (
    <div aria-hidden="true">
        <div className="skeleton aspect-[4/3] rounded-card" />
        <div className="skeleton mt-4 h-6 w-1/3 rounded" />
        <div className="skeleton mt-2 h-4 w-2/3 rounded" />
        <div className="skeleton mt-2 h-4 w-1/2 rounded" />
    </div>
);

PropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default PropertyCard;
