import PropTypes from "prop-types";
import { cld } from "../lib/cloudinary";
import site from "../data/siteImages.json";

/** Split layout for sign-in / sign-up: form on the left, an arched photo on the right. */
const AuthShell = ({ eyebrow, title, subtitle, image = site.heroTower, children }) => (
    <div className="container-page grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-12 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto w-full max-w-md animate-rise">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
            <div className="mt-8">{children}</div>
        </div>
        <div className="relative hidden h-[640px] lg:block" aria-hidden="true">
            <img src={cld(image, { w: 900, h: 1280 })} alt="" className="absolute inset-y-0 right-0 h-full w-[88%] rounded-arch object-cover shadow-pop" />
            <span className="absolute bottom-10 left-0 h-24 w-16 rounded-arch bg-plum" />
            <span className="absolute bottom-24 left-12 h-12 w-8 rounded-arch bg-coral" />
        </div>
    </div>
);

AuthShell.propTypes = {
    eyebrow: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    children: PropTypes.node,
};

export default AuthShell;
