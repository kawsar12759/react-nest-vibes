import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Firebase mutates the user object in place on profile updates; bumping this re-renders consumers.
    const [profileVersion, setProfileVersion] = useState(0);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const refreshProfile = useCallback(() => setProfileVersion((v) => v + 1), []);

    const signUp = useCallback(async ({ name, email, password, photoURL }) => {
        const { user: created } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(created, { displayName: name, photoURL: photoURL || null });
        refreshProfile();
        return created;
    }, [refreshProfile]);

    const signInWithEmail = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), []);
    const signInWithGoogle = useCallback(() => signInWithPopup(auth, provider), []);
    const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), []);
    const logOut = useCallback(() => signOut(auth), []);

    const updateUserProfile = useCallback(async ({ displayName, photoURL }) => {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        refreshProfile();
    }, [refreshProfile]);

    const value = useMemo(
        () => ({ user, loading, profileVersion, signUp, signInWithEmail, signInWithGoogle, resetPassword, logOut, updateUserProfile }),
        [user, loading, profileVersion, signUp, signInWithEmail, signInWithGoogle, resetPassword, logOut, updateUserProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
