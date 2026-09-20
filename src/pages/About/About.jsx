import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PiHandshake, PiShieldCheck, PiSealCheck, PiLightning, PiArrowRight } from 'react-icons/pi';
import { cld } from '../../lib/cloudinary';
import site from '../../data/siteImages.json';

const VALUES = [
    { icon: PiHandshake, title: 'Customer first', text: 'Personal advice from people who know the neighborhoods, so you find a home that fits your life.' },
    { icon: PiShieldCheck, title: 'Integrity', text: 'Honest pricing and clear terms in every listing and every conversation.' },
    { icon: PiSealCheck, title: 'Quality', text: 'We check the details, from listing photos to lease paperwork.' },
    { icon: PiLightning, title: 'Useful technology', text: 'Search, saved homes and tour booking that save you trips and phone calls.' },
];

// A dated timeline, so order carries meaning.
const MILESTONES = [
    { year: '2017', title: 'Founded', text: 'Started as a local business focused on quality apartment listings.' },
    { year: '2018', title: 'Vacation rentals', text: 'Added cabins, beach houses and villas for travelers.' },
    { year: '2020', title: 'Online platform', text: 'Launched search, virtual tours and online tour booking.' },
    { year: '2023', title: 'Student housing', text: 'Partnered with landlords near campuses to house students.' },
];

const TEAM = [
    { img: site.team1, name: 'John Doe', role: 'Founder & CEO' },
    { img: site.team2, name: 'Jane Smith', role: 'Chief Operating Officer' },
    { img: site.team3, name: 'Mark Jones', role: 'Head of Marketing' },
    { img: site.team4, name: 'Susan Lee', role: 'Senior Real Estate Agent' },
    { img: site.team5, name: 'David Choi', role: 'Financial Analyst' },
    { img: site.team6, name: 'Emily Blunt', role: 'Customer Service Manager' },
];

const About = () => {
    return (
        <>
            <Helmet>
                <title>NestVibes | About us</title>
            </Helmet>

            <section className="container-page grid items-end gap-10 pb-16 pt-12 lg:grid-cols-[1.2fr_1fr]">
                <div className="animate-rise">
                    <p className="eyebrow">About NestVibes</p>
                    <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-7xl">
                        Finding a home is about <em className="font-normal italic text-plum">more</em> than a transaction.
                    </h1>
                </div>
                <p className="text-lg leading-8 text-muted lg:pb-3">
                    It&apos;s about finding the place where life happens. Since 2017 we&apos;ve matched renters, students, travelers and buyers with homes that suit how they live.
                </p>
            </section>

            <div className="container-page">
                <img src={cld(site.aboutHero, { w: 1800, h: 700 })} alt="A modern residential street" className="h-[280px] w-full rounded-card object-cover sm:h-[460px]" />
            </div>

            <section className="container-page py-24">
                <p className="eyebrow">What we stand for</p>
                <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="bg-surface p-7">
                            <Icon className="text-3xl text-plum" />
                            <h3 className="mt-5 text-lg font-bold">{title}</h3>
                            <p className="mt-2 text-muted">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-page grid gap-14 pb-24 lg:grid-cols-2 lg:items-center">
                <img src={cld(site.story, { w: 900, h: 1100 })} alt="The NestVibes team at work" loading="lazy" className="mx-auto aspect-[4/5] w-full max-w-md rounded-arch object-cover shadow-pop" />
                <div>
                    <p className="eyebrow">Our story</p>
                    <h2 className="display mt-3 text-4xl sm:text-5xl">One office, one idea, four big steps</h2>
                    <ol className="mt-10 space-y-8 border-l border-line pl-8">
                        {MILESTONES.map((m) => (
                            <li key={m.year} className="relative">
                                <span className="absolute -left-[2.3rem] top-1 h-3 w-3 rounded-full border-2 border-paper bg-plum ring-1 ring-plum" />
                                <p className="font-display text-3xl font-semibold text-plum">{m.year}</p>
                                <h3 className="mt-1 font-bold">{m.title}</h3>
                                <p className="text-muted">{m.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="bg-surface py-24">
                <div className="container-page">
                    <p className="eyebrow">The team</p>
                    <h2 className="display mt-3 text-4xl sm:text-5xl">The people behind your next move</h2>
                    <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
                        {TEAM.map((t) => (
                            <li key={t.name}>
                                <img src={cld(t.img, { w: 360, h: 460 })} alt={t.name} loading="lazy" className="aspect-[4/5] w-full rounded-arch bg-sunken object-cover" />
                                <p className="mt-4 font-bold">{t.name}</p>
                                <p className="text-sm text-muted">{t.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="container-page pt-24 text-center">
                <h2 className="display mx-auto max-w-2xl text-4xl sm:text-5xl">Ready to find the place that fits?</h2>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to="/properties" className="btn-primary !px-7 !py-3.5">Browse homes <PiArrowRight /></Link>
                    <Link to="/listings/new" className="btn-ghost !px-7 !py-3.5">List your home</Link>
                </div>
            </section>
        </>
    );
};

export default About;
