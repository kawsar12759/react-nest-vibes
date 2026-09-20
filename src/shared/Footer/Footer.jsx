import { Link } from "react-router-dom";
import { PiGithubLogo, PiLinkedinLogo, PiEnvelopeSimple } from "react-icons/pi";
import Logo from "../../components/Logo";
import { CATEGORIES } from "../../lib/listings";

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-line bg-surface">
            <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
                        Apartments, student housing and vacation rentals, with photos, tours and saved homes in one place.
                    </p>
                    <div className="mt-6 flex gap-2">
                        {[
                            { href: "https://github.com/kawsar12759/react-nest-vibes", icon: PiGithubLogo, label: "GitHub repository" },
                            { href: "https://www.linkedin.com/in/kawsar-hossain-antor/", icon: PiLinkedinLogo, label: "LinkedIn" },
                            { href: "mailto:kawsar.hossain12759@gmail.com", icon: PiEnvelopeSimple, label: "Email" },
                        ].map(({ href, icon: Icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg text-muted transition hover:border-plum hover:text-plum">
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>

                <FooterColumn title="Browse">
                    {CATEGORIES.map((c) => (
                        <Link key={c} to={`/properties?category=${encodeURIComponent(c)}`}>{c}</Link>
                    ))}
                    <Link to="/properties?status=Sale">Homes for sale</Link>
                </FooterColumn>
                <FooterColumn title="Owners">
                    <Link to="/listings/new">List a home</Link>
                    <Link to="/dashboard/listings">Manage listings</Link>
                    <Link to="/dashboard/tours">Tour requests</Link>
                </FooterColumn>
                <FooterColumn title="NestVibes">
                    <Link to="/about">About us</Link>
                    <Link to="/blogs">Journal</Link>
                    <Link to="/reviews">Client reviews</Link>
                </FooterColumn>
            </div>
            <div className="border-t border-line">
                <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} NestVibes. A portfolio project by MD. Kawsar Hossain.</p>
                    <p>Built with React, Firebase and Cloudinary.</p>
                </div>
            </div>
        </footer>
    );
};

// eslint-disable-next-line react/prop-types
const FooterColumn = ({ title, children }) => (
    <div>
        <h4 className="eyebrow mb-4 !text-muted">{title}</h4>
        <div className="flex flex-col gap-2.5 text-sm font-semibold [&>a:hover]:text-plum">{children}</div>
    </div>
);

export default Footer;
