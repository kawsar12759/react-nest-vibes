import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PiSquaresFour, PiHouseLine, PiHeart, PiCalendarBlank, PiUserCircle } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import Avatar from "../../components/Avatar";

const TABS = [
    { to: "/dashboard", end: true, icon: PiSquaresFour, label: "Overview" },
    { to: "/dashboard/listings", icon: PiHouseLine, label: "My listings" },
    { to: "/dashboard/saved", icon: PiHeart, label: "Saved homes" },
    { to: "/dashboard/tours", icon: PiCalendarBlank, label: "Tours" },
    { to: "/dashboard/profile", icon: PiUserCircle, label: "Profile" },
];

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div className="container-page pt-10">
            <Helmet>
                <title>NestVibes | Dashboard</title>
            </Helmet>
            <div className="flex items-center gap-4">
                <Avatar src={user.photoURL} name={user.displayName || user.email} size={56} />
                <div>
                    <p className="eyebrow">Dashboard</p>
                    <h1 className="display text-3xl sm:text-4xl">Hi, {user.displayName?.split(" ")[0] || "there"}</h1>
                </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
                <nav aria-label="Dashboard" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
                    <ul className="flex gap-1 lg:sticky lg:top-24 lg:flex-col">
                        {TABS.map(({ to, end, icon: Icon, label }) => (
                            <li key={to} className="shrink-0">
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold transition lg:rounded-xl ${
                                            isActive ? "bg-plum text-plum-ink" : "text-muted hover:bg-sunken hover:text-ink"
                                        }`
                                    }
                                >
                                    <Icon className="text-lg" /> {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="min-w-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
