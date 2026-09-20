import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Stars from "../../components/Stars";
import Avatar from "../../components/Avatar";
import { formatDate } from "../../lib/format";
import reviews from "../../data/reviews.json";

const average = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
const breakdown = [5, 4, 3, 2, 1].map((n) => ({ n, count: reviews.filter((r) => r.rating === n).length }));

const Reviews = () => {
    const [filter, setFilter] = useState(0);
    const shown = [...reviews]
        .filter((r) => !filter || r.rating === filter)
        .sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="container-page pt-12">
            <Helmet>
                <title>NestVibes | Reviews</title>
            </Helmet>
            <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-end">
                <div>
                    <p className="eyebrow">Client reviews</p>
                    <h1 className="display mt-3 text-5xl leading-[1.02] sm:text-6xl">In their words</h1>
                    <p className="mt-4 max-w-xl text-lg text-muted">What renters, students and buyers said after moving in with our help.</p>
                </div>
                <div className="card p-6">
                    <div className="flex items-end gap-4">
                        <p className="font-display text-6xl font-semibold leading-none">{average.toFixed(1)}</p>
                        <div className="pb-1">
                            <Stars rating={Math.round(average * 2) / 2} className="text-lg text-coral" />
                            <p className="text-sm text-muted">{reviews.length} reviews</p>
                        </div>
                    </div>
                    <ul className="mt-5 space-y-1.5">
                        {breakdown.map(({ n, count }) => (
                            <li key={n}>
                                <button
                                    onClick={() => setFilter(filter === n ? 0 : n)}
                                    disabled={!count}
                                    aria-pressed={filter === n}
                                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-sm transition disabled:opacity-40 ${filter === n ? "bg-plum-soft" : "hover:bg-sunken"}`}
                                >
                                    <span className="w-10 text-left font-semibold">{n} ★</span>
                                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-sunken">
                                        <span className="block h-full rounded-full bg-plum" style={{ width: `${(count / reviews.length) * 100}%` }} />
                                    </span>
                                    <span className="w-6 text-right text-muted">{count}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {filter > 0 && (
                <p className="mt-10 text-sm text-muted">
                    Showing {filter}-star reviews · <button onClick={() => setFilter(0)} className="font-bold text-plum hover:underline">Show all</button>
                </p>
            )}

            <div className="mt-8 columns-1 gap-5 md:columns-2 xl:columns-3 [&>*]:mb-5">
                {shown.map((r) => (
                    <figure key={r.id} className="card break-inside-avoid p-6 animate-rise">
                        <Stars rating={r.rating} className="text-coral" />
                        <blockquote className="mt-4 font-display text-lg leading-snug">{r.review}</blockquote>
                        <figcaption className="mt-5 flex items-center gap-3">
                            <Avatar name={r.name} size={36} />
                            <div>
                                <p className="text-sm font-bold">{r.name}</p>
                                <p className="text-xs text-muted">{formatDate(r.date)}</p>
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
