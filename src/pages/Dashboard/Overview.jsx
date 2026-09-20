import { Link } from "react-router-dom";
import { PiHouseLine, PiHeart, PiCalendarBlank, PiTray, PiPlus, PiArrowRight } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import { useFavorites } from "../../providers/FavoritesProvider";
import useAsync from "../../hooks/useAsync";
import { fetchListingsByOwner } from "../../lib/listings";
import { fetchIncomingTourRequests, fetchMyTourRequests } from "../../lib/tours";

const Overview = () => {
    const { user } = useAuth();
    const { ids } = useFavorites();
    const { data, loading } = useAsync(
        () => Promise.all([fetchListingsByOwner(user.uid), fetchMyTourRequests(user.uid), fetchIncomingTourRequests(user.uid)]),
        [user.uid]
    );
    const [listings = [], sent = [], incoming = []] = data || [];
    const pending = incoming.filter((t) => t.status === "pending").length;

    const stats = [
        { to: "/dashboard/listings", icon: PiHouseLine, label: "Your listings", value: listings.length },
        { to: "/dashboard/saved", icon: PiHeart, label: "Saved homes", value: ids.size },
        { to: "/dashboard/tours", icon: PiCalendarBlank, label: "Tours you requested", value: sent.length },
        { to: "/dashboard/tours?view=incoming", icon: PiTray, label: "Requests awaiting you", value: pending, highlight: pending > 0 },
    ];

    return (
        <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ to, icon: Icon, label, value, highlight }) => (
                    <Link key={label} to={to} className={`card group p-5 transition hover:border-plum/50 hover:shadow-lift ${highlight ? "border-coral/60" : ""}`}>
                        <Icon className={`text-2xl ${highlight ? "text-coral" : "text-plum"}`} />
                        <p className="mt-4 font-display text-4xl font-semibold">{loading && label !== "Saved homes" ? "–" : value}</p>
                        <p className="mt-1 flex items-center justify-between text-sm font-semibold text-muted">
                            {label} <PiArrowRight className="transition group-hover:translate-x-1" />
                        </p>
                    </Link>
                ))}
            </div>

            <div className="card flex flex-col gap-6 overflow-hidden bg-plum-deep p-8 text-white dark:bg-plum-soft sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="display text-3xl">Have a place to rent or sell?</h2>
                    <p className="mt-2 max-w-md text-white/75">Upload photos, set the price and publish. Tour requests arrive here.</p>
                </div>
                <Link to="/listings/new" className="btn shrink-0 bg-white !px-6 !py-3 text-plum-deep hover:bg-white/90 dark:text-ink">
                    <PiPlus /> List a home
                </Link>
            </div>
        </div>
    );
};

export default Overview;
