import { useState } from "react";
import PropTypes from "prop-types";
import { PiCalculator } from "react-icons/pi";
import { formatPrice } from "../../lib/format";

/** Standard amortized mortgage payment. */
function monthlyPayment(principal, annualRate, years) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (!r) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
}

const Slider = ({ label, value, display, ...props }) => (
    <label className="block">
        <span className="flex justify-between text-sm">
            <span className="font-semibold">{label}</span>
            <span className="font-bold text-plum">{display ?? value}</span>
        </span>
        <input type="range" value={value} className="mt-2 w-full accent-plum" {...props} />
    </label>
);

Slider.propTypes = { label: PropTypes.string, value: PropTypes.number, display: PropTypes.node };

const MortgageCalculator = ({ price }) => {
    const [downPct, setDownPct] = useState(20);
    const [rate, setRate] = useState(6.5);
    const [years, setYears] = useState(30);

    const down = (price * downPct) / 100;
    const payment = monthlyPayment(price - down, rate, years);

    return (
        <div className="space-y-5">
            <Slider label="Down payment" min={3} max={60} step={1} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} display={`${downPct}% · ${formatPrice(down)}`} />
            <Slider label="Interest rate" min={2} max={12} step={0.125} value={rate} onChange={(e) => setRate(Number(e.target.value))} display={`${rate}%`} />
            <div>
                <span className="text-sm font-semibold">Loan term</span>
                <div className="mt-2 flex gap-2">
                    {[15, 20, 30].map((y) => (
                        <button key={y} type="button" onClick={() => setYears(y)} className={`chip flex-1 justify-center ${years === y ? "chip-active" : ""}`}>{y} yrs</button>
                    ))}
                </div>
            </div>
            <div className="rounded-xl bg-plum-soft p-4">
                <p className="text-sm text-muted">Estimated monthly payment</p>
                <p className="font-display text-3xl font-semibold text-plum">{formatPrice(Math.round(payment))}<span className="text-base font-normal">/mo</span></p>
                <p className="mt-1 text-xs text-muted">Principal and interest only. Taxes and insurance are extra.</p>
            </div>
        </div>
    );
};

const StayCalculator = ({ price }) => {
    const [nights, setNights] = useState(3);
    const [guests, setGuests] = useState(2);
    const total = price * nights;

    return (
        <div className="space-y-5">
            <Slider label="Nights" min={1} max={28} value={nights} onChange={(e) => setNights(Number(e.target.value))} />
            <Slider label="Guests" min={1} max={12} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
            <dl className="space-y-2 rounded-xl bg-plum-soft p-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted">{formatPrice(price)} × {nights} nights</dt><dd className="font-semibold">{formatPrice(price * nights)}</dd></div>
                <div className="flex justify-between border-t border-plum/20 pt-2"><dt className="font-bold">Total for {guests} {guests === 1 ? "guest" : "guests"}</dt><dd className="font-display text-xl font-semibold text-plum">{formatPrice(total)}</dd></div>
            </dl>
            <p className="-mt-3 text-xs text-muted">Before taxes and any fees the owner sets.</p>
        </div>
    );
};

const CostCalculator = ({ listing }) => {
    if (listing.priceUnit === "month") return null;
    const isSale = listing.status === "Sale";
    return (
        <section className="card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold">
                <PiCalculator className="text-plum" /> {isSale ? "Mortgage calculator" : "Plan your stay"}
            </h3>
            <div className="mt-5">{isSale ? <MortgageCalculator price={listing.price} /> : <StayCalculator price={listing.price} />}</div>
        </section>
    );
};

MortgageCalculator.propTypes = { price: PropTypes.number.isRequired };
StayCalculator.propTypes = { price: PropTypes.number.isRequired };
CostCalculator.propTypes = { listing: PropTypes.object.isRequired };

export default CostCalculator;
