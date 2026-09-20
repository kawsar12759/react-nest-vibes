import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { PiArrowLeft, PiBed, PiBathtub, PiRuler, PiMapPin, PiShareNetwork, PiCheck, PiHouseLine, PiTag } from "react-icons/pi";
import useAsync from "../../hooks/useAsync";
import { CATEGORY_PLURAL, fetchAllListings, fetchListing } from "../../lib/listings";
import { averageRating, formatArea, formatDate, formatPrice } from "../../lib/format";
import { useAuth } from "../../providers/AuthProvider";
import Gallery from "./Gallery";
import TourForm from "./TourForm";
import CostCalculator from "./CostCalculator";
import FavoriteButton from "../../components/FavoriteButton";
import PropertyCard from "../../components/PropertyCard";
import Stars from "../../components/Stars";
import Avatar from "../../components/Avatar";
import EmptyState from "../../components/EmptyState";
import PageLoader from "../../components/PageLoader";

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { data: listing, loading, error } = useAsync(() => fetchListing(id), [id]);
    const { data: all = [] } = useAsync(fetchAllListings);

    const similar = useMemo(
        () => (listing ? all.filter((p) => p.category === listing.category && p.id !== listing.id).slice(0, 3) : []),
        [all, listing]
    );

    if (loading) return <PageLoader />;
    if (error || !listing) {
        return (
            <div className="container-page py-20">
                <EmptyState icon={PiHouseLine} title="This home isn’t available" action={<Link to="/properties" className="btn-primary">Browse other homes</Link>}>
                    It may have been removed by its owner, or the link is mistyped.
                </EmptyState>
            </div>
        );
    }

    const rating = averageRating(listing.reviews);
    const share = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) await navigator.share({ title: listing.title, url });
            else {
                await navigator.clipboard.writeText(url);
                toast.success("Link copied");
            }
        } catch {
            /* user dismissed the share sheet */
        }
    };

    const facts = [
        { icon: PiBed, label: "Bedrooms", value: listing.bedrooms },
        { icon: PiBathtub, label: "Bathrooms", value: listing.washrooms },
        { icon: PiRuler, label: "Living area", value: formatArea(listing.area) },
        { icon: PiTag, label: "Type", value: listing.category },
    ];

    return (
        <div className="container-page pt-6">
            <Helmet>
                <title>{`${listing.title} | NestVibes`}</title>
                <meta name="description" content={listing.description.slice(0, 155)} />
            </Helmet>

            <Link to="/properties" className="btn-quiet -ml-3 mb-4 !px-3 text-sm"><PiArrowLeft /> All homes</Link>

            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${listing.status === "Sale" ? "bg-coral text-white" : "bg-plum-soft text-plum"}`}>
                            For {listing.status.toLowerCase()}
                        </span>
                        {rating && (
                            <span className="flex items-center gap-1.5 text-sm font-semibold">
                                <Stars rating={rating} className="text-coral" /> {rating} · {listing.reviews.length} reviews
                            </span>
                        )}
                    </div>
                    <h1 className="display text-4xl leading-tight sm:text-5xl">{listing.title}</h1>
                    <p className="mt-2 flex items-center gap-1.5 text-muted"><PiMapPin /> {listing.location}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={share} className="btn-ghost"><PiShareNetwork /> Share</button>
                    <FavoriteButton listing={listing} withLabel className="btn-ghost" />
                </div>
            </header>

            <Gallery images={listing.images} title={listing.title} />

            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
                <div className="min-w-0">
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-4">
                        {facts.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-surface p-5">
                                <Icon className="text-2xl text-plum" />
                                <dt className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
                                <dd className="mt-0.5 font-bold">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <section className="mt-12">
                        <h2 className="display text-3xl">About this home</h2>
                        <p className="mt-4 whitespace-pre-line text-lg leading-8 text-ink/85">{listing.description}</p>
                    </section>

                    {listing.facilities.length > 0 && (
                        <section className="mt-12">
                            <h2 className="display text-3xl">What&apos;s included</h2>
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {listing.facilities.map((f) => (
                                    <li key={f} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 font-semibold">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-plum-soft text-sm text-plum"><PiCheck /></span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section className="mt-12">
                        <h2 className="display text-3xl">Location</h2>
                        <p className="mt-2 text-muted">{listing.location}</p>
                        <div className="mt-5 overflow-hidden rounded-card border border-line">
                            <iframe
                                title={`Map of ${listing.location}`}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.location)}&z=12&output=embed`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-80 w-full grayscale-[35%] dark:invert-[90%] dark:hue-rotate-180"
                            />
                        </div>
                    </section>

                    {listing.reviews.length > 0 && (
                        <section className="mt-12">
                            <div className="flex items-end justify-between">
                                <h2 className="display text-3xl">Resident reviews</h2>
                                <p className="text-sm text-muted"><b className="text-ink">{rating}</b> average</p>
                            </div>
                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                {listing.reviews.map((r) => (
                                    <figure key={r.name} className="card p-5">
                                        <div className="flex items-center gap-3">
                                            <Avatar name={r.name} size={38} />
                                            <figcaption className="flex-1 font-bold">{r.name}</figcaption>
                                            <Stars rating={r.rating} className="text-sm text-coral" />
                                        </div>
                                        <blockquote className="mt-3 text-muted">{r.comment}</blockquote>
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                    <section className="card p-6 shadow-lift">
                        <p className="font-display text-4xl font-semibold tracking-tight">{formatPrice(listing.price, listing.priceUnit)}</p>
                        <div className="mt-4 flex items-center gap-3 border-y border-line py-4">
                            <Avatar src={listing.ownerPhoto} name={listing.ownerName} size={44} />
                            <div className="text-sm">
                                <p className="font-bold">{listing.ownerName}</p>
                                <p className="text-muted">Listed {formatDate(listing.createdAt)}</p>
                            </div>
                        </div>
                        <h3 className="mb-3 mt-5 font-bold">Book a tour</h3>
                        <TourForm key={user?.uid || "guest"} listing={listing} />
                    </section>
                    <CostCalculator listing={listing} />
                </aside>
            </div>

            {similar.length > 0 && (
                <section className="mt-24">
                    <h2 className="display mb-8 text-4xl">More {CATEGORY_PLURAL[listing.category].toLowerCase()} like this</h2>
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                        {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
                    </div>
                </section>
            )}
        </div>
    );
};

export default PropertyDetails;
