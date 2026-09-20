import { PiMagnifyingGlass, PiCalendarBlank, PiKey } from "react-icons/pi";

// A real sequence, so the numbering carries meaning.
const STEPS = [
    { icon: PiMagnifyingGlass, title: "Search and save", text: "Filter by type, budget and bedrooms. Tap the heart to keep a shortlist that syncs to your account." },
    { icon: PiCalendarBlank, title: "Book a tour", text: "Pick a date and time on any listing. The request lands in the owner's dashboard for them to confirm." },
    { icon: PiKey, title: "Move in", text: "Track confirmed tours from your dashboard and get the keys to the place that fits." },
];

const HowItWorks = () => (
    <section className="bg-plum-deep py-24 text-white dark:bg-sunken">
        <div className="container-page">
            <p className="eyebrow !text-white/60">How it works</p>
            <h2 className="display mt-3 max-w-2xl text-4xl leading-[1.05] sm:text-5xl">From first search to front door in three steps</h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {STEPS.map(({ icon: Icon, title, text }, i) => (
                    <li key={title} className="relative border-t border-white/20 pt-8">
                        <span className="absolute -top-px left-0 h-px w-16 bg-coral" />
                        <div className="flex items-center justify-between">
                            <span className="font-display text-6xl font-light italic text-white/35">{i + 1}</span>
                            <Icon className="text-3xl text-coral" />
                        </div>
                        <h3 className="mt-5 text-xl font-bold">{title}</h3>
                        <p className="mt-2 leading-7 text-white/70">{text}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default HowItWorks;
