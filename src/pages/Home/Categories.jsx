import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PiBuildings, PiStudent, PiUmbrellaSimple, PiArrowRight } from "react-icons/pi";
import SectionHeading from "../../components/SectionHeading";
import { formatPrice } from "../../lib/format";

const META = {
    Apartment: { icon: PiBuildings, heading: "Apartments & homes", blurb: "City flats, family homes and penthouses, to rent or to own." },
    "Student Housing": { icon: PiStudent, heading: "Student housing", blurb: "Furnished rooms near campus with study space and fast Wi-Fi." },
    "Vacation Rental": { icon: PiUmbrellaSimple, heading: "Vacation rentals", blurb: "Cabins, beach houses and villas, priced by the night." },
};

const Categories = ({ listings }) => (
    <section className="container-page py-20">
        <SectionHeading eyebrow="Browse by type" title="Start with how you want to live" />
        <div className="grid gap-5 md:grid-cols-3">
            {Object.entries(META).map(([category, { icon: Icon, heading, blurb }]) => {
                const inCategory = listings.filter((l) => l.category === category);
                const cheapestRent = inCategory
                    .filter((l) => l.status === "Rent")
                    .sort((a, b) => a.price - b.price)[0];
                return (
                    <Link
                        key={category}
                        to={`/properties?category=${encodeURIComponent(category)}`}
                        className="card group relative flex flex-col overflow-hidden p-7 transition hover:-translate-y-1 hover:border-plum/50 hover:shadow-lift"
                    >
                        <span className="flex h-14 w-11 items-end justify-center rounded-arch bg-plum-soft pb-2.5 text-2xl text-plum transition group-hover:bg-plum group-hover:text-plum-ink">
                            <Icon />
                        </span>
                        <h3 className="display mt-6 text-2xl">{heading}</h3>
                        <p className="mt-2 flex-1 text-muted">{blurb}</p>
                        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                            <span className="text-muted">
                                <b className="text-ink">{inCategory.length}</b> listed
                                {cheapestRent && <> · from <b className="text-ink">{formatPrice(cheapestRent.price, cheapestRent.priceUnit)}</b></>}
                            </span>
                            <PiArrowRight className="text-lg text-plum transition group-hover:translate-x-1" />
                        </div>
                    </Link>
                );
            })}
        </div>
    </section>
);

Categories.propTypes = { listings: PropTypes.array.isRequired };

export default Categories;
