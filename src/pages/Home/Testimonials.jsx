import { Link } from "react-router-dom";
import { PiQuotes } from "react-icons/pi";
import SectionHeading from "../../components/SectionHeading";
import Stars from "../../components/Stars";
import Avatar from "../../components/Avatar";
import { formatDate } from "../../lib/format";
import reviews from "../../data/reviews.json";

const picks = reviews.filter((r) => r.rating === 5).slice(0, 3);

const Testimonials = () => (
    <section className="container-page py-24">
        <SectionHeading
            eyebrow="Client reviews"
            title="What renters and buyers tell us"
            action={<Link to="/reviews" className="btn-ghost">Read all {reviews.length} reviews</Link>}
        />
        <div className="grid gap-5 md:grid-cols-3">
            {picks.map((r, i) => (
                <figure key={r.id} className={`card flex flex-col p-7 ${i === 1 ? "md:translate-y-8" : ""}`}>
                    <PiQuotes className="text-4xl text-plum/40" />
                    <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">{r.review}</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                        <Avatar name={r.name} size={42} />
                        <div className="flex-1">
                            <p className="font-bold">{r.name}</p>
                            <p className="text-xs text-muted">{formatDate(r.date)}</p>
                        </div>
                        <Stars rating={r.rating} className="text-sm text-coral" />
                    </figcaption>
                </figure>
            ))}
        </div>
    </section>
);

export default Testimonials;
