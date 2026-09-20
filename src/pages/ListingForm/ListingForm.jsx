import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { PiArrowLeft, PiCheck, PiTrash, PiWarningCircle } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import { CATEGORIES, FACILITY_OPTIONS, createListing, deleteListing, fetchListing, updateListing } from "../../lib/listings";
import ImageUploader from "../../components/ImageUploader";
import PageLoader from "../../components/PageLoader";
import EmptyState from "../../components/EmptyState";

const EMPTY = {
    title: "",
    description: "",
    category: "Apartment",
    status: "Rent",
    priceUnit: "month",
    price: "",
    area: "",
    bedrooms: "1",
    washrooms: "1",
    location: "",
    facilities: [],
    images: [],
};

function validate(v) {
    const errors = {};
    if (v.title.trim().length < 3) errors.title = "Give the listing a title of at least 3 characters.";
    if (v.title.length > 90) errors.title = "Keep the title under 90 characters.";
    if (!v.location.trim() || !v.location.includes(",")) errors.location = "Enter a city and state, e.g. Austin, TX.";
    if (!(Number(v.price) > 0)) errors.price = "Enter a price above zero.";
    if (!(Number(v.area) > 0)) errors.area = "Enter the living area in square feet.";
    if (v.description.trim().length < 20) errors.description = "Describe the home in at least 20 characters.";
    if (v.images.length === 0) errors.images = "Add at least one photo.";
    return errors;
}

/* eslint-disable react/prop-types */
const Section = ({ title, hint, children }) => (
    <section className="grid gap-6 border-t border-line py-10 md:grid-cols-[240px_1fr]">
        <div>
            <h2 className="text-lg font-bold">{title}</h2>
            {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
        </div>
        <div className="min-w-0 space-y-5">{children}</div>
    </section>
);

const FieldError = ({ message }) =>
    message ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"><PiWarningCircle /> {message}</p>
    ) : null;

/* eslint-enable react/prop-types */

const ListingForm = () => {
    const { id } = useParams();
    const editing = Boolean(id);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState(EMPTY);
    const [initialImages, setInitialImages] = useState([]);
    const [loadState, setLoadState] = useState(editing ? "loading" : "ready");
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!editing) return;
        fetchListing(id)
            .then((listing) => {
                if (!listing || listing.ownerId !== user.uid) {
                    setLoadState("forbidden");
                    return;
                }
                setValues({
                    ...EMPTY,
                    ...listing,
                    price: String(listing.price),
                    area: String(listing.area),
                    bedrooms: String(listing.bedrooms),
                    washrooms: String(listing.washrooms),
                    priceUnit: listing.priceUnit === "total" ? "month" : listing.priceUnit,
                });
                setInitialImages(listing.images);
                setLoadState("ready");
            })
            .catch(() => setLoadState("forbidden"));
    }, [editing, id, user.uid]);

    const set = (key, value) => {
        setValues((v) => ({ ...v, [key]: value }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
    const bind = (key) => ({ name: key, value: values[key], onChange: (e) => set(key, e.target.value) });
    const toggleFacility = (f) =>
        set("facilities", values.facilities.includes(f) ? values.facilities.filter((x) => x !== f) : [...values.facilities, f]);

    const submit = async (e) => {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length) {
            toast.error("Check the highlighted fields");
            document.querySelector(`[name="${Object.keys(found)[0]}"], #field-${Object.keys(found)[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }
        setSaving(true);
        try {
            if (editing) {
                await updateListing(id, values);
                toast.success("Changes saved");
                navigate(`/property/${id}`);
            } else {
                const newId = await createListing(values, user);
                toast.success("Listing published", { description: "It's live for every visitor now." });
                navigate(`/property/${newId}`);
            }
        } catch (err) {
            console.error(err);
            toast.error(editing ? "Couldn’t save changes. Try again." : "Couldn’t publish the listing. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async () => {
        if (!window.confirm("Delete this listing? It will disappear for everyone.")) return;
        try {
            await deleteListing(id);
            toast.success("Listing deleted");
            navigate("/dashboard/listings");
        } catch {
            toast.error("Couldn’t delete the listing. Try again.");
        }
    };

    if (loadState === "loading") return <PageLoader />;
    if (loadState === "forbidden") {
        return (
            <div className="container-page py-20">
                <EmptyState title="You can only edit your own listings" action={<Link to="/dashboard/listings" className="btn-primary">Go to my listings</Link>}>
                    This listing doesn&apos;t exist or belongs to someone else.
                </EmptyState>
            </div>
        );
    }

    return (
        <div className="container-page max-w-5xl pt-8">
            <Helmet>
                <title>{editing ? "NestVibes | Edit listing" : "NestVibes | List a home"}</title>
            </Helmet>
            <Link to={editing ? "/dashboard/listings" : "/"} className="btn-quiet -ml-3 !px-3 text-sm"><PiArrowLeft /> Back</Link>
            <p className="eyebrow mt-6">{editing ? "Edit listing" : "List a home"}</p>
            <h1 className="display mt-3 text-4xl sm:text-5xl">{editing ? values.title || "Edit listing" : "Tell renters and buyers about your place"}</h1>

            <form onSubmit={submit} noValidate className="mt-10">
                <Section title="Photos" hint="Bright, wide shots work best. The first photo is the cover on every card.">
                    <div id="field-images">
                        <ImageUploader
                            initial={initialImages}
                            onChange={(imgs) => set("images", imgs)}
                            onBusyChange={setUploading}
                        />
                        <FieldError message={errors.images} />
                    </div>
                </Section>

                <Section title="The basics">
                    <div>
                        <label className="field-label" htmlFor="title">Listing title</label>
                        <input id="title" {...bind("title")} maxLength={90} placeholder="Sunny two-bedroom near the river" className="field" />
                        <FieldError message={errors.title} />
                    </div>
                    <div>
                        <span className="field-label">Type of home</span>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((c) => (
                                <button key={c} type="button" onClick={() => set("category", c)} className={`chip ${values.category === c ? "chip-active" : ""}`}>{c}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="field-label" htmlFor="location">Location</label>
                        <input id="location" {...bind("location")} placeholder="Austin, TX" className="field" />
                        <FieldError message={errors.location} />
                    </div>
                </Section>

                <Section title="Price" hint="Homes for sale show a mortgage calculator. Nightly rentals show a stay calculator.">
                    <div className="flex flex-wrap gap-2">
                        {[["Rent", "month", "Rent monthly"], ["Rent", "night", "Rent nightly"], ["Sale", "total", "Sell"]].map(([status, unit, label]) => {
                            const active = values.status === status && (status === "Sale" || values.priceUnit === unit);
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setValues((v) => ({ ...v, status, priceUnit: status === "Sale" ? v.priceUnit : unit }))}
                                    className={`chip ${active ? "chip-active" : ""}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="max-w-xs">
                        <label className="field-label" htmlFor="price">
                            {values.status === "Sale" ? "Asking price" : values.priceUnit === "night" ? "Price per night" : "Rent per month"} (USD)
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted">$</span>
                            <input id="price" type="number" min="1" inputMode="numeric" {...bind("price")} className="field !pl-8" />
                        </div>
                        <FieldError message={errors.price} />
                    </div>
                </Section>

                <Section title="Size and rooms">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label className="field-label" htmlFor="bedrooms">Bedrooms</label>
                            <select id="bedrooms" {...bind("bedrooms")} className="field">
                                {Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i === 0 ? "Studio" : i}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="field-label" htmlFor="washrooms">Bathrooms</label>
                            <select id="washrooms" {...bind("washrooms")} className="field">
                                {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="field-label" htmlFor="area">Area (sq ft)</label>
                            <input id="area" type="number" min="1" inputMode="numeric" {...bind("area")} className="field" />
                            <FieldError message={errors.area} />
                        </div>
                    </div>
                </Section>

                <Section title="Description and features">
                    <div>
                        <label className="field-label" htmlFor="description">Description</label>
                        <textarea id="description" rows={6} maxLength={2000} {...bind("description")} placeholder="What makes this place great to live in? Mention light, layout, the neighborhood and transport." className="field resize-y" />
                        <div className="flex justify-between">
                            <FieldError message={errors.description} />
                            <span className="field-hint ml-auto">{values.description.length}/2000</span>
                        </div>
                    </div>
                    <div>
                        <span className="field-label">Features</span>
                        <div className="flex flex-wrap gap-2">
                            {FACILITY_OPTIONS.map((f) => {
                                const on = values.facilities.includes(f);
                                return (
                                    <button key={f} type="button" onClick={() => toggleFacility(f)} aria-pressed={on} className={`chip ${on ? "chip-active" : ""}`}>
                                        {on && <PiCheck />} {f}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Section>

                <div className="sticky bottom-0 z-20 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
                    {editing ? (
                        <button type="button" onClick={remove} className="btn-quiet !text-danger"><PiTrash /> Delete listing</button>
                    ) : (
                        <p className="text-sm text-muted">{uploading ? "Waiting for photos to finish uploading…" : "Your listing goes live as soon as you publish."}</p>
                    )}
                    <button type="submit" disabled={saving || uploading} className="btn-primary !px-8 !py-3">
                        {saving ? "Saving…" : editing ? "Save changes" : "Publish listing"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ListingForm;
