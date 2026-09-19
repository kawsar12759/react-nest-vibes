import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { PiMagnifyingGlass, PiMapPin } from "react-icons/pi";
import { CATEGORIES } from "../lib/listings";

const SearchBar = ({ className = "" }) => {
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const submit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        if (category) params.set("category", category);
        if (status) params.set("status", status);
        navigate(`/properties?${params}`);
    };

    return (
        <form onSubmit={submit} role="search" className={`card grid gap-1 p-2 shadow-lift sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center ${className}`}>
            <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 focus-within:bg-sunken">
                <PiMapPin className="shrink-0 text-xl text-plum" />
                <span className="flex w-full flex-col">
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Where</span>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="City or keyword"
                        className="w-full bg-transparent text-sm font-semibold placeholder:font-normal placeholder:text-muted/70 focus:outline-none"
                    />
                </span>
            </label>
            <label className="flex flex-col rounded-xl px-4 py-2.5 focus-within:bg-sunken sm:border-l sm:border-line">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Type</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent text-sm font-semibold focus:outline-none">
                    <option value="">Any type</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
            </label>
            <label className="flex flex-col rounded-xl px-4 py-2.5 focus-within:bg-sunken sm:border-l sm:border-line">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted">Buy / rent</span>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-transparent text-sm font-semibold focus:outline-none">
                    <option value="">Either</option>
                    <option value="Sale">Buy</option>
                    <option value="Rent">Rent</option>
                </select>
            </label>
            <button type="submit" className="btn-primary m-1 !py-3.5">
                <PiMagnifyingGlass className="text-lg" /> Search
            </button>
        </form>
    );
};

SearchBar.propTypes = { className: PropTypes.string };

export default SearchBar;
