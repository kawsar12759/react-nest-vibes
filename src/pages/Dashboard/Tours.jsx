import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { PiCalendarBlank, PiCheck, PiX, PiEnvelopeSimple, PiPhone } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import useAsync from "../../hooks/useAsync";
import { cancelTourRequest, fetchIncomingTourRequests, fetchMyTourRequests, setTourStatus } from "../../lib/tours";
import { cld } from "../../lib/cloudinary";
import EmptyState from "../../components/EmptyState";

const STATUS_STYLE = {
    pending: "bg-sunken text-muted",
    confirmed: "bg-plum-soft text-plum",
    declined: "bg-coral-soft text-coral",
};

const when = (t) =>
    new Date(`${t.date}T${t.time || "12:00"}`).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const TourRow = ({ tour, incoming, onChange }) => {
    const act = async (fn, success) => {
        try {
            await fn();
            toast.success(success);
            onChange();
        } catch {
            toast.error("Couldn’t update the request. Try again.");
        }
    };

    return (
        <li className="card flex flex-col gap-4 p-4 sm:flex-row">
            <Link to={`/property/${tour.listingId}`} className="shrink-0">
                <img src={cld(tour.listingImage, { w: 240, h: 180 })} alt="" className="aspect-[4/3] w-full rounded-xl bg-sunken object-cover sm:w-28" />
            </Link>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${STATUS_STYLE[tour.status]}`}>{tour.status}</span>
                    <span className="flex items-center gap-1 text-sm font-bold"><PiCalendarBlank /> {when(tour)}</span>
                </div>
                <Link to={`/property/${tour.listingId}`} className="mt-1 block truncate font-bold hover:text-plum">{tour.listingTitle}</Link>
                {incoming ? (
                    <div className="mt-1 text-sm text-muted">
                        <p>From <b className="text-ink">{tour.name}</b></p>
                        <p className="flex flex-wrap gap-x-4">
                            <a href={`mailto:${tour.email}`} className="flex items-center gap-1 hover:text-plum"><PiEnvelopeSimple /> {tour.email}</a>
                            {tour.phone && <a href={`tel:${tour.phone}`} className="flex items-center gap-1 hover:text-plum"><PiPhone /> {tour.phone}</a>}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-muted">{tour.listingLocation}</p>
                )}
                {tour.message && <p className="mt-2 rounded-lg bg-sunken px-3 py-2 text-sm">&ldquo;{tour.message}&rdquo;</p>}
            </div>
            <div className="flex shrink-0 items-start gap-2">
                {incoming && tour.status === "pending" && (
                    <>
                        <button onClick={() => act(() => setTourStatus(tour.id, "confirmed"), "Tour confirmed")} className="btn-primary !px-4 !py-2"><PiCheck /> Confirm</button>
                        <button onClick={() => act(() => setTourStatus(tour.id, "declined"), "Tour declined")} className="btn-ghost !px-4 !py-2"><PiX /> Decline</button>
                    </>
                )}
                {!incoming && (
                    <button onClick={() => act(() => cancelTourRequest(tour.id), "Tour request cancelled")} className="btn-quiet !px-3 !py-2 text-sm">
                        {tour.status === "pending" ? "Cancel request" : "Remove"}
                    </button>
                )}
            </div>
        </li>
    );
};

TourRow.propTypes = { tour: PropTypes.object.isRequired, incoming: PropTypes.bool, onChange: PropTypes.func.isRequired };

const Tours = () => {
    const { user } = useAuth();
    const [params, setParams] = useSearchParams();
    const view = params.get("view") === "incoming" ? "incoming" : "sent";
    const { data = [], loading, reload } = useAsync(
        () => (view === "incoming" ? fetchIncomingTourRequests(user.uid) : fetchMyTourRequests(user.uid)),
        [view, user.uid]
    );

    return (
        <div>
            <h2 className="display mb-5 text-3xl">Tours</h2>
            <div className="mb-6 inline-flex rounded-full border border-line bg-surface p-1" role="tablist">
                {[["sent", "Tours I requested"], ["incoming", "Requests for my homes"]].map(([key, label]) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={view === key}
                        onClick={() => setParams(key === "sent" ? {} : { view: key })}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${view === key ? "bg-plum text-plum-ink" : "text-muted hover:text-ink"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="space-y-3">{[0, 1].map((i) => <div key={i} className="skeleton h-28 rounded-card" />)}</div>
            ) : data.length === 0 ? (
                view === "sent" ? (
                    <EmptyState icon={PiCalendarBlank} title="No tours booked yet" action={<Link to="/properties" className="btn-primary">Find a home to tour</Link>}>
                        Open any listing and pick a date. Requests you send appear here with the owner&apos;s reply.
                    </EmptyState>
                ) : (
                    <EmptyState icon={PiCalendarBlank} title="No requests for your homes yet" action={<Link to="/dashboard/listings" className="btn-primary">Manage my listings</Link>}>
                        When someone books a tour of one of your listings, you can confirm or decline it here.
                    </EmptyState>
                )
            ) : (
                <ul className="space-y-3">
                    {data.map((t) => <TourRow key={t.id} tour={t} incoming={view === "incoming"} onChange={reload} />)}
                </ul>
            )}
        </div>
    );
};

export default Tours;
