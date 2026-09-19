import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./AuthProvider";

const FavoritesContext = createContext(null);

export const useFavorites = () => useContext(FavoritesContext);

const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ids, setIds] = useState(() => new Set());

    useEffect(() => {
        if (!user) {
            setIds(new Set());
            return;
        }
        return onSnapshot(
            collection(db, "users", user.uid, "favorites"),
            (snap) => setIds(new Set(snap.docs.map((d) => d.id))),
            (err) => console.warn("Could not load saved homes", err)
        );
    }, [user]);

    const toggleFavorite = useCallback(async (listing) => {
        if (!user) {
            toast("Sign in to save homes", { description: "Saved homes sync across your devices." });
            navigate("/signin", { state: { from: location.pathname } });
            return;
        }
        const ref = doc(db, "users", user.uid, "favorites", listing.id);
        const saved = ids.has(listing.id);
        // Optimistic update; the snapshot listener reconciles with the server.
        setIds((prev) => {
            const next = new Set(prev);
            saved ? next.delete(listing.id) : next.add(listing.id);
            return next;
        });
        try {
            if (saved) {
                await deleteDoc(ref);
            } else {
                await setDoc(ref, { savedAt: serverTimestamp(), title: listing.title });
                toast.success("Saved to your homes", { description: listing.title });
            }
        } catch {
            toast.error("Couldn’t update saved homes. Try again.");
        }
    }, [user, ids, navigate]);

    const value = useMemo(() => ({ ids, isFavorite: (id) => ids.has(id), toggleFavorite }), [ids, toggleFavorite]);
    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
    children: PropTypes.node,
};

export default FavoritesProvider;
