import { Link } from "react-router-dom";
import { toast } from "sonner";
import { PiPlus, PiPencilSimple, PiTrash, PiEye, PiHouseLine } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import useAsync from "../../hooks/useAsync";
import { deleteListing, fetchListingsByOwner } from "../../lib/listings";
import { cld } from "../../lib/cloudinary";
import { formatDate, formatPrice } from "../../lib/format";
import EmptyState from "../../components/EmptyState";

const MyListings = () => {
    const { user } = useAuth();
    const { data: listings = [], loading, error, reload } = useAsync(() => fetchListingsByOwner(user.uid), [user.uid]);

    const remove = async (listing) => {
        if (!window.confirm(`Delete "${listing.title}"? It will disappear for everyone.`)) return;
        try {
            await deleteListing(listing.id);
            toast.success("Listing deleted");
            reload();
        } catch {
            toast.error("Couldn’t delete the listing. Try again.");
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="display text-3xl">My listings</h2>
                <Link to="/listings/new" className="btn-primary"><PiPlus /> New listing</Link>
            </div>

            {loading ? (
                <div className="space-y-3">{[0, 1].map((i) => <div key={i} className="skeleton h-28 rounded-card" />)}</div>
            ) : error ? (
                <EmptyState title="Couldn’t load your listings" action={<button onClick={reload} className="btn-primary">Try again</button>}>
                    Check your connection and try again.
                </EmptyState>
            ) : listings.length === 0 ? (
                <EmptyState icon={PiHouseLine} title="You haven’t listed a home yet" action={<Link to="/listings/new" className="btn-primary"><PiPlus /> List your first home</Link>}>
                    Add photos and details, and your listing goes live for every visitor.
                </EmptyState>
            ) : (
                <ul className="space-y-3">
                    {listings.map((l) => (
                        <li key={l.id} className="card flex flex-col gap-4 p-3 sm:flex-row sm:items-center">
                            <img src={cld(l.images[0]?.url, { w: 320, h: 240 })} alt="" className="aspect-[4/3] w-full rounded-xl object-cover sm:w-36" />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-bold">{l.title}</p>
                                <p className="text-sm text-muted">{l.location} · {l.category}</p>
                                <p className="mt-1 text-sm">
                                    <b>{formatPrice(l.price, l.priceUnit)}</b>
                                    <span className="text-muted"> · {l.images.length} photos · listed {formatDate(l.createdAt)}</span>
                                </p>
                            </div>
                            <div className="flex gap-1 sm:pr-2">
                                <Link to={`/property/${l.id}`} className="btn-quiet !p-2.5 text-lg" aria-label={`View ${l.title}`}><PiEye /></Link>
                                <Link to={`/listings/${l.id}/edit`} className="btn-quiet !p-2.5 text-lg" aria-label={`Edit ${l.title}`}><PiPencilSimple /></Link>
                                <button onClick={() => remove(l)} className="btn-quiet !p-2.5 text-lg hover:!text-danger" aria-label={`Delete ${l.title}`}><PiTrash /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyListings;
