import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const profileUpdate = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (isSigningUp) {
                return;
            }
            setUser(currentUser);
            console.log('Observing current user inside useeffect of authprovider', currentUser);
            setLoading(false);

        });
        return () => {
            unSubscribe();
        }
    }, [])

    const AuthInfo = { user, createUser, signInWithEmail, profileUpdate, setIsSigningUp, logOut, loading };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;