import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import FavoritesProvider from "../../providers/FavoritesProvider";
import { useTheme } from "../../providers/ThemeProvider";

const Root = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    return (
        <FavoritesProvider>
            {/* Thin progress bar while a lazily loaded page is on its way. */}
            <div
                aria-hidden="true"
                className={`fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-plum transition-transform duration-500 ${
                    navigation.state === "loading" ? "scale-x-75" : "scale-x-0"
                }`}
            />
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main id="main" className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
            <Toaster
                theme={theme}
                position="bottom-right"
                toastOptions={{ className: "!font-sans !rounded-xl !border-line" }}
            />
            <ScrollRestoration />
        </FavoritesProvider>
    );
};

export default Root;
