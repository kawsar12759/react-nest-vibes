import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PiArrowUpRight } from "react-icons/pi";
import SearchBar from "../../components/SearchBar";
import { cld } from "../../lib/cloudinary";
import { formatPrice } from "../../lib/format";
import site from "../../data/siteImages.json";

const Hero = ({ listings }) => {
    const cities = new Set(listings.map((l) => l.location.split(",").pop().trim())).size;
    const spotlight = listings[0];

    return (
        <section className="container-page grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-28 lg:pt-16">
            <div className="animate-rise">
                <p className="eyebrow">Apartments · Student housing · Vacation rentals</p>
                <h1 className="display mt-5 text-[2.9rem] leading-[0.98] xs:text-6xl lg:text-[5.2rem]">
                    A place that <em className="font-normal italic text-plum">fits</em> the way you live.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                    Search homes to rent or buy, save the ones you love, and book a tour straight from the listing.
                </p>
                <SearchBar className="mt-9" />
                {listings.length > 0 && (
                    <p className="mt-5 text-sm text-muted">
                        <b className="text-ink">{listings.length} homes</b> across <b className="text-ink">{cities} states</b>, from studios to penthouses.
                    </p>
                )}
            </div>

            {/* Signature: arched windows. */}
            <div className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[520px]" aria-hidden="true">
                <svg viewBox="0 0 200 260" className="absolute -right-2 top-2 h-[92%] text-plum/25" fill="none">
                    <path d="M4 258V100a96 96 0 0 1 192 0v158" stroke="currentColor" strokeWidth="1" />
                    <path d="M18 258V104a82 82 0 0 1 164 0v154" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
                </svg>
                <img
                    src={cld(site.heroModern, { w: 700, h: 980 })}
                    alt=""
                    className="absolute left-0 top-0 h-[86%] w-[56%] rounded-arch object-cover shadow-pop animate-rise [animation-delay:120ms]"
                />
                <img
                    src={cld(site.heroStreet, { w: 560, h: 760 })}
                    alt=""
                    className="absolute bottom-0 right-[4%] h-[68%] w-[40%] rounded-arch object-cover shadow-pop animate-rise [animation-delay:240ms]"
                />
                <span className="absolute right-[8%] top-[6%] h-16 w-12 rounded-arch bg-coral/90 animate-rise [animation-delay:360ms]" />
            </div>

            {spotlight && (
                <Link
                    to={`/property/${spotlight.id}`}
                    className="card group relative z-10 -mt-6 flex items-center gap-4 p-3 pr-5 shadow-lift transition hover:-translate-y-0.5 lg:col-start-2 lg:-mt-24 lg:ml-6 lg:max-w-sm"
                >
                    <img src={cld(spotlight.images[0].url, { w: 160, h: 160 })} alt="" className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-plum">Newest listing</p>
                        <p className="truncate font-bold">{spotlight.title}</p>
                        <p className="text-sm text-muted">{formatPrice(spotlight.price, spotlight.priceUnit)} · {spotlight.location}</p>
                    </div>
                    <PiArrowUpRight className="text-xl text-muted transition group-hover:text-plum" />
                </Link>
            )}
        </section>
    );
};

Hero.propTypes = { listings: PropTypes.array.isRequired };

export default Hero;
