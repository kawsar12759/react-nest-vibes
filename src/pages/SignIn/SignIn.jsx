import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useAuth } from "../../providers/AuthProvider";
import { authErrorMessage } from "../../lib/format";
import AuthShell from "../../components/AuthShell";
import PasswordInput from "../../components/PasswordInput";
import GoogleButton from "../../components/GoogleButton";

const SignIn = () => {
    const { user, signInWithEmail, signInWithGoogle, resetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const destination = location.state?.from || "/";
    const [busy, setBusy] = useState(false);
    const [email, setEmail] = useState("");
    const resetRef = useRef(null);
    const [resetEmail, setResetEmail] = useState("");

    useEffect(() => {
        if (location.state?.fromProtected) toast("Sign in to continue", { id: "protected" });
    }, [location.state]);

    useEffect(() => {
        if (user) navigate(destination, { replace: true });
    }, [user, navigate, destination]);

    const run = async (fn) => {
        setBusy(true);
        try {
            await fn();
            toast.success("Welcome back");
        } catch (err) {
            toast.error(authErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        run(() => signInWithEmail(email.trim(), e.target.password.value));
    };

    const sendReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(resetEmail.trim());
            resetRef.current.close();
            toast.success("Check your inbox", { description: `We sent a reset link to ${resetEmail}.` });
        } catch (err) {
            toast.error(authErrorMessage(err));
        }
    };

    return (
        <AuthShell eyebrow="Welcome back" title="Sign in to NestVibes" subtitle="Pick up where you left off: saved homes, tours and your listings.">
            <Helmet>
                <title>NestVibes | Sign in</title>
            </Helmet>
            <GoogleButton onClick={() => run(signInWithGoogle)} disabled={busy} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="field-label">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
                </div>
                <div>
                    <div className="flex items-baseline justify-between">
                        <label htmlFor="password" className="field-label">Password</label>
                        <button
                            type="button"
                            onClick={() => {
                                setResetEmail(email);
                                resetRef.current.showModal();
                            }}
                            className="text-sm font-semibold text-plum hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <PasswordInput id="password" name="password" autoComplete="current-password" required />
                </div>
                <button type="submit" disabled={busy} className="btn-primary w-full !py-3">{busy ? "Signing in…" : "Sign in"}</button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
                New to NestVibes? <Link to="/signup" state={location.state} className="font-bold text-plum hover:underline">Create an account</Link>
            </p>

            <dialog ref={resetRef} className="card m-auto w-[min(92vw,28rem)] p-0 text-ink shadow-pop" aria-labelledby="reset-title">
                <form onSubmit={sendReset} className="p-6 sm:p-8">
                    <h2 id="reset-title" className="display text-2xl">Reset your password</h2>
                    <p className="mt-2 text-sm text-muted">Enter the email on your account and we&apos;ll send you a reset link.</p>
                    <input type="email" required value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="field mt-5" aria-label="Email" autoFocus />
                    <div className="mt-6 flex justify-end gap-2">
                        <button type="button" onClick={() => resetRef.current.close()} className="btn-quiet">Cancel</button>
                        <button type="submit" className="btn-primary">Send reset link</button>
                    </div>
                </form>
            </dialog>
        </AuthShell>
    );
};

export default SignIn;
