import { Link } from "react-router-dom";
import { PiHeart } from "react-icons/pi";
import { useFavorites } from "../../providers/FavoritesProvider";
import useAsync from "../../hooks/useAsync";
import { fetchAllListings } from "../../lib/listings";
import PropertyCard, { PropertyCardSkeleton } from "../../components/PropertyCard";
import EmptyState from "../../components/EmptyState";

const Saved = () => {
    const { ids } = useFavorites();
    const { data: all = [], loading } = useAsync(fetchAllListings);
    const saved = all.filter((l) => ids.has(l.id));

    return (
        <div>
            <h2 className="display mb-6 text-3xl">Saved homes</h2>
            {loading ? (
                <div className="grid gap-6 sm:grid-cols-2">{[0, 1].map((i) => <PropertyCardSkeleton key={i} />)}</div>
            ) : saved.length === 0 ? (
                <EmptyState icon={PiHeart} title="No saved homes yet" action={<Link to="/properties" className="btn-primary">Browse homes</Link>}>
                    Tap the heart on any listing to keep it here. Your list syncs across devices.
                </EmptyState>
            ) : (
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 2xl:grid-cols-3">
                    {saved.map((p) => <PropertyCard key={p.id} property={p} />)}
                </div>
            )}
        </div>
    );
};

export default Saved;
