import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiList, PiX, PiSun, PiMoon, PiPlus, PiSquaresFour, PiHeart, PiUserCircle, PiSignOut, PiCalendarBlank } from "react-icons/pi";
import { toast } from "sonner";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";
import Logo from "../../components/Logo";
import Avatar from "../../components/Avatar";

const links = [
    { to: "/properties", label: "Browse homes" },
    { to: "/about", label: "About" },
    { to: "/blogs", label: "Journal" },
    { to: "/reviews", label: "Reviews" },
];

const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-semibold transition ${isActive ? "text-ink" : "text-muted hover:text-ink"} ` +
    (isActive ? "after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-plum" : "");

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        setMobileOpen(false);
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const close = (e) => {
            if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("mousedown", close);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const handleSignOut = async () => {
        await logOut();
        toast("Signed out");
        navigate("/");
    };

    const themeButton = (
        <button onClick={toggleTheme} className="btn-quiet !p-2.5 text-lg" aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <PiSun /> : <PiMoon />}
        </button>
    );

    return (
        <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || mobileOpen ? "border-line bg-paper/90 backdrop-blur-lg" : "border-transparent bg-paper"}`}>
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-plum-ink">
                Skip to content
            </a>
            <nav className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
                <Logo />

                <ul className="hidden items-center gap-7 lg:flex">
                    {links.map((l) => (
                        <li key={l.to}><NavLink to={l.to} className={linkClass}>{l.label}</NavLink></li>
                    ))}
                </ul>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    {themeButton}
                    {user ? (
                        <>
                            <Link to="/listings/new" className="btn-primary hidden sm:inline-flex">
                                <PiPlus /> List a home
                            </Link>
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen((o) => !o)}
                                    className="flex items-center rounded-full p-0.5 ring-2 ring-transparent transition hover:ring-plum/40"
                                    aria-haspopup="menu"
                                    aria-expanded={menuOpen}
                                    aria-label="Account menu"
                                >
                                    <Avatar src={user.photoURL} name={user.displayName || user.email} size={38} />
                                </button>
                                {menuOpen && (
                                    <div role="menu" className="card absolute right-0 mt-3 w-64 overflow-hidden p-1.5 shadow-pop animate-rise [animation-duration:.2s]">
                                        <div className="border-b border-line px-3 pb-3 pt-2">
                                            <p className="truncate font-bold">{user.displayName || "Your account"}</p>
                                            <p className="truncate text-xs text-muted">{user.email}</p>
                                        </div>
                                        {[
                                            { to: "/dashboard", icon: PiSquaresFour, label: "Dashboard" },
                                            { to: "/dashboard/saved", icon: PiHeart, label: "Saved homes" },
                                            { to: "/dashboard/tours", icon: PiCalendarBlank, label: "Tour requests" },
                                            { to: "/dashboard/profile", icon: PiUserCircle, label: "Profile" },
                                        ].map(({ to, icon: Icon, label }) => (
                                            <Link key={to} to={to} role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-sunken">
                                                <Icon className="text-lg text-muted" /> {label}
                                            </Link>
                                        ))}
                                        <button onClick={handleSignOut} role="menuitem" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-danger hover:bg-sunken">
                                            <PiSignOut className="text-lg" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" state={{ from: location.pathname }} className="btn-quiet hidden xs:inline-flex">Sign in</Link>
                            <Link to="/signup" className="btn-primary hidden xs:inline-flex">Create account</Link>
                        </>
                    )}
                    <button onClick={() => setMobileOpen((o) => !o)} className="btn-quiet !p-2.5 text-xl lg:hidden" aria-expanded={mobileOpen} aria-label="Menu">
                        {mobileOpen ? <PiX /> : <PiList />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="border-t border-line lg:hidden">
                    <ul className="container-page flex flex-col py-3">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink to={l.to} className={({ isActive }) => `block rounded-lg px-3 py-3 font-semibold ${isActive ? "bg-plum-soft text-plum" : "hover:bg-sunken"}`}>
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                        <li className="mt-2 flex gap-2 border-t border-line pt-4">
                            {user ? (
                                <Link to="/listings/new" className="btn-primary flex-1"><PiPlus /> List a home</Link>
                            ) : (
                                <>
                                    <Link to="/signin" className="btn-ghost flex-1">Sign in</Link>
                                    <Link to="/signup" className="btn-primary flex-1">Create account</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
