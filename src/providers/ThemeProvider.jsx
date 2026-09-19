import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    // index.html already applied the class before first paint; read it back as the source of truth.
    const [theme, setTheme] = useState(() =>
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((current) => {
            const next = current === "dark" ? "light" : "dark";
            try {
                localStorage.setItem("nv-theme", next);
            } catch {
                /* storage can be unavailable in private windows */
            }
            return next;
        });
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default ThemeProvider;
