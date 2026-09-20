import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PiMagnifyingGlass, PiSlidersHorizontal, PiX, PiHouseLine } from "react-icons/pi";
import PropertyCard, { PropertyCardSkeleton } from "../../components/PropertyCard";
import EmptyState from "../../components/EmptyState";
import useAsync from "../../hooks/useAsync";
import { CATEGORIES, CATEGORY_PLURAL, fetchAllListings, filterListings } from "../../lib/listings";

const PAGE_SIZE = 9;
const FILTER_KEYS = ["q", "category", "status", "beds", "minPrice", "maxPrice", "sort"];

const Properties = () => {
    const [params, setParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [visible, setVisible] = useState(PAGE_SIZE);
    const { data: listings = [], loading } = useAsync(fetchAllListings);

    const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || ""]));
    const results = useMemo(() => filterListings(listings, filters), [listings, params]); // eslint-disable-line react-hooks/exhaustive-deps
    const activeCount = ["category", "status", "beds", "minPrice", "maxPrice"].filter((k) => filters[k]).length;

    const setFilter = (key, value) => {
        const next = new URLSearchParams(params);
        value ? next.set(key, value) : next.delete(key);
        setParams(next, { replace: true });
        setVisible(PAGE_SIZE);
    };
    const clearAll = () => {
        setParams({}, { replace: true });
        setVisible(PAGE_SIZE);
    };

    return (
        <div className="container-page pb-10 pt-10">
            <Helmet>
                <title>NestVibes | Browse homes</title>
            </Helmet>
            <p className="eyebrow">Browse homes</p>
            <h1 className="display mt-3 text-4xl sm:text-6xl">
                {CATEGORY_PLURAL[filters.category] || "Every home on NestVibes"}
            </h1>

            {/* Search + quick filters */}
            <div className="sticky top-16 z-30 -mx-4 mt-8 border-b border-line bg-paper/90 px-4 py-4 backdrop-blur-lg sm:-mx-6 sm:px-6 md:top-[4.5rem] lg:-mx-10 lg:px-10">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <label className="relative flex-1">
                        <PiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted" />
                        <input
                            type="search"
                            value={filters.q}
                            onChange={(e) => setFilter("q", e.target.value)}
                            placeholder="Search by city, title or feature"
                            className="field !rounded-full !pl-11"
                            aria-label="Search homes"
                        />
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                        <button className={`chip ${!filters.category ? "chip-active" : ""}`} onClick={() => setFilter("category", "")}>All types</button>
                        {CATEGORIES.map((c) => (
                            <button key={c} className={`chip ${filters.category === c ? "chip-active" : ""}`} onClick={() => setFilter("category", filters.category === c ? "" : c)}>
                                {c}
                            </button>
                        ))}
                        <button className={`chip ${showFilters ? "border-ink text-ink" : ""}`} onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>
                            <PiSlidersHorizontal /> Filters{activeCount > 0 && ` · ${activeCount}`}
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 grid gap-4 rounded-card border border-line bg-surface p-5 animate-rise [animation-duration:.25s] sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <span className="field-label">Buy or rent</span>
                            <div className="flex gap-2">
                                {[["", "Either"], ["Sale", "Buy"], ["Rent", "Rent"]].map(([v, label]) => (
                                    <button key={label} className={`chip flex-1 justify-center ${filters.status === v ? "chip-active" : ""}`} onClick={() => setFilter("status", v)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="field-label">Bedrooms</span>
                            <div className="flex gap-2">
                                {["", "1", "2", "3", "4"].map((b) => (
                                    <button key={b || "any"} className={`chip flex-1 justify-center !px-2 ${filters.beds === b ? "chip-active" : ""}`} onClick={() => setFilter("beds", b)}>
                                        {b ? `${b}+` : "Any"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="field-label">Price range (USD)</span>
                            <div className="flex items-center gap-2">
                                <input type="number" min="0" inputMode="numeric" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilter("minPrice", e.target.value)} className="field !py-2" aria-label="Minimum price" />
                                <span className="text-muted">–</span>
                                <input type="number" min="0" inputMode="numeric" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilter("maxPrice", e.target.value)} className="field !py-2" aria-label="Maximum price" />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button onClick={clearAll} className="btn-quiet w-full" disabled={!activeCount && !filters.q}>
                                <PiX /> Clear all filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-8 mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted" aria-live="polite">
                    {loading ? "Loading homes…" : <><b className="text-ink">{results.length}</b> {results.length === 1 ? "home" : "homes"} found</>}
                </p>
                <label className="flex items-center gap-2 text-sm">
                    <span className="text-muted">Sort by</span>
                    <select value={filters.sort || "newest"} onChange={(e) => setFilter("sort", e.target.value === "newest" ? "" : e.target.value)} className="rounded-full border border-line bg-surface px-3 py-1.5 font-semibold focus:border-plum focus:outline-none">
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="area-desc">Largest first</option>
                    </select>
                </label>
            </div>

            {loading ? (
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, i) => <PropertyCardSkeleton key={i} />)}
                </div>
            ) : results.length === 0 ? (
                <EmptyState icon={PiHouseLine} title="No homes match those filters" action={<button onClick={clearAll} className="btn-primary">Clear all filters</button>}>
                    Try a wider price range, fewer bedrooms, or a different city.
                </EmptyState>
            ) : (
                <>
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                        {results.slice(0, visible).map((p, i) => (
                            <PropertyCard key={p.id} property={p} style={{ animationDelay: `${(i % PAGE_SIZE) * 50}ms` }} />
                        ))}
                    </div>
                    {visible < results.length && (
                        <div className="mt-14 flex flex-col items-center gap-3">
                            <p className="text-sm text-muted">Showing {visible} of {results.length}</p>
                            <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-ghost !px-8">Show more homes</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Properties;
