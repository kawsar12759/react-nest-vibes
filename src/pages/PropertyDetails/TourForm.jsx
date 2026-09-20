import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { PiCalendarBlank, PiCheckCircle } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import { requestTour } from "../../lib/tours";

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
const toLabel = (t) => new Date(`2000-01-01T${t}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// Local calendar date (toISOString would use UTC and can land on today east of Greenwich).
const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const TourForm = ({ listing }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [form, setForm] = useState(() => ({
        name: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        date: tomorrow(),
        time: "11:00",
        message: "",
    }));
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    if (!user) {
        return (
            <div className="text-center">
                <p className="text-sm text-muted">Sign in to pick a date and time. The owner confirms from their dashboard.</p>
                <Link to="/signin" state={{ from: location.pathname }} className="btn-primary mt-4 w-full">
                    <PiCalendarBlank /> Sign in to book a tour
                </Link>
            </div>
        );
    }

    if (user.uid === listing.ownerId) {
        return (
            <div className="text-center">
                <p className="text-sm text-muted">This is your listing. Tour requests for it appear in your dashboard.</p>
                <div className="mt-4 flex gap-2">
                    <Link to={`/listings/${listing.id}/edit`} className="btn-primary flex-1">Edit listing</Link>
                    <Link to="/dashboard/tours" className="btn-ghost flex-1">View requests</Link>
                </div>
            </div>
        );
    }

    if (sent) {
        return (
            <div className="py-4 text-center animate-rise">
                <PiCheckCircle className="mx-auto text-5xl text-plum" />
                <p className="mt-3 text-lg font-bold">Tour requested</p>
                <p className="mt-1 text-sm text-muted">
                    {new Date(`${form.date}T${form.time}`).toLocaleString("en-US", { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}. You&apos;ll see the owner&apos;s reply in your dashboard.
                </p>
                <Link to="/dashboard/tours" className="btn-ghost mt-5">Track your requests</Link>
            </div>
        );
    }

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await requestTour(listing, user, form);
            setSent(true);
            toast.success("Tour requested", { description: listing.title });
        } catch {
            toast.error("Couldn’t send the tour request. Try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-[1.3fr_1fr] gap-2">
                <label>
                    <span className="sr-only">Date</span>
                    <input type="date" name="date" required min={tomorrow()} value={form.date} onChange={update} className="field" />
                </label>
                <label>
                    <span className="sr-only">Time</span>
                    <select name="time" value={form.time} onChange={update} className="field">
                        {TIMES.map((t) => <option key={t} value={t}>{toLabel(t)}</option>)}
                    </select>
                </label>
            </div>
            <input name="name" required placeholder="Full name" value={form.name} onChange={update} className="field" aria-label="Full name" />
            <input name="email" type="email" required placeholder="Email" value={form.email} onChange={update} className="field" aria-label="Email" />
            <input name="phone" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={update} className="field" aria-label="Phone" />
            <textarea name="message" rows={3} maxLength={500} placeholder="Anything the owner should know?" value={form.message} onChange={update} className="field resize-none" aria-label="Message" />
            <button type="submit" disabled={sending} className="btn-primary w-full !py-3">
                <PiCalendarBlank /> {sending ? "Sending…" : "Request a tour"}
            </button>
        </form>
    );
};

TourForm.propTypes = { listing: PropTypes.object.isRequired };

export default TourForm;
