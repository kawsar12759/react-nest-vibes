import { Link } from "react-router-dom";
import { PiCheck, PiPlus } from "react-icons/pi";
import { cld } from "../../lib/cloudinary";
import site from "../../data/siteImages.json";

const OwnersCta = () => (
    <section className="container-page grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:order-2">
            <img
                src={cld(site.family, { w: 820, h: 1000 })}
                alt="A family sitting on their living-room floor holding a cardboard roof over their heads"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-arch object-cover shadow-pop"
            />
            <div className="card absolute -bottom-6 -left-4 flex items-center gap-3 p-4 shadow-lift sm:-left-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-plum-soft text-plum"><PiCheck /></span>
                <div>
                    <p className="text-sm font-bold">Tour request received</p>
                    <p className="text-xs text-muted">Saturday, 11:00 AM</p>
                </div>
            </div>
        </div>
        <div>
            <p className="eyebrow">For owners</p>
            <h2 className="display mt-3 text-4xl leading-[1.05] sm:text-5xl">List your home in the time it takes to make coffee</h2>
            <p className="mt-5 text-lg leading-8 text-muted">
                Drag in your photos, add the details, and publish. Your listing goes live for every visitor straight away.
            </p>
            <ul className="mt-8 space-y-3">
                {[
                    "Upload up to 10 photos and choose the cover",
                    "Tour requests arrive in your dashboard",
                    "Edit the price or photos any time",
                ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-plum text-sm text-plum-ink"><PiCheck /></span>
                        <span className="font-semibold">{item}</span>
                    </li>
                ))}
            </ul>
            <Link to="/listings/new" className="btn-primary mt-10 !px-7 !py-3.5 text-base">
                <PiPlus /> List a home
            </Link>
        </div>
    </section>
);

export default OwnersCta;
