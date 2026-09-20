import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { PiCheck } from "react-icons/pi";
import { useAuth } from "../../providers/AuthProvider";
import { authErrorMessage } from "../../lib/format";
import AuthShell from "../../components/AuthShell";
import AvatarUploader from "../../components/AvatarUploader";
import PasswordInput from "../../components/PasswordInput";
import GoogleButton from "../../components/GoogleButton";
import site from "../../data/siteImages.json";

const RULES = [
    { test: (p) => p.length >= 8, label: "8+ characters" },
    { test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p), label: "Upper and lower case" },
    { test: (p) => /\d/.test(p), label: "A number" },
];

const SignUp = () => {
    const { user, signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.from || "/";
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [photoURL, setPhotoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [signingUp, setSigningUp] = useState(false);

    // Wait for the profile (name + photo) to be written before leaving the page.
    useEffect(() => {
        if (user && !signingUp) navigate(destination, { replace: true });
    }, [user, signingUp, navigate, destination]);

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    const passed = RULES.map((r) => r.test(form.password));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.name.trim().length < 2) return toast.error("Enter your name.");
        if (!passed.every(Boolean)) return toast.error("Choose a password that meets all three rules.");
        if (form.password !== form.confirm) return toast.error("The passwords don’t match.");

        setBusy(true);
        setSigningUp(true);
        try {
            await signUp({ name: form.name.trim(), email: form.email.trim(), password: form.password, photoURL });
            toast.success(`Welcome to NestVibes, ${form.name.trim().split(" ")[0]}`);
        } catch (err) {
            toast.error(authErrorMessage(err));
        } finally {
            setBusy(false);
            setSigningUp(false);
        }
    };

    const google = async () => {
        setBusy(true);
        try {
            await signInWithGoogle();
            toast.success("Welcome to NestVibes");
        } catch (err) {
            toast.error(authErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <AuthShell eyebrow="Create an account" title="Join NestVibes" subtitle="Save homes, book tours and list your own place." image={site.heroVilla}>
            <Helmet>
                <title>NestVibes | Create account</title>
            </Helmet>
            <GoogleButton onClick={google} disabled={busy} label="Sign up with Google" />
            <form onSubmit={handleSubmit} className="space-y-4">
                <AvatarUploader value={photoURL} name={form.name || "You"} onChange={setPhotoURL} onBusyChange={setUploading} size={80} />
                <div>
                    <label htmlFor="name" className="field-label">Full name</label>
                    <input id="name" name="name" autoComplete="name" required value={form.name} onChange={update} className="field" />
                </div>
                <div>
                    <label htmlFor="email" className="field-label">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} className="field" />
                </div>
                <div>
                    <label htmlFor="password" className="field-label">Password</label>
                    <PasswordInput id="password" name="password" autoComplete="new-password" required value={form.password} onChange={update} />
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label="Password rules">
                        {RULES.map((r, i) => (
                            <li key={r.label} className={`flex items-center gap-1 font-semibold ${passed[i] ? "text-plum" : "text-muted"}`}>
                                <PiCheck className={passed[i] ? "" : "opacity-30"} /> {r.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label htmlFor="confirm" className="field-label">Confirm password</label>
                    <PasswordInput id="confirm" name="confirm" autoComplete="new-password" required value={form.confirm} onChange={update} />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted">
                    <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-plum" />
                    I agree to the Terms of Service and Privacy Policy.
                </label>
                <button type="submit" disabled={busy || uploading} className="btn-primary w-full !py-3">
                    {uploading ? "Uploading photo…" : busy ? "Creating account…" : "Create account"}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
                Already have an account? <Link to="/signin" state={location.state} className="font-bold text-plum hover:underline">Sign in</Link>
            </p>
        </AuthShell>
    );
};

export default SignUp;
