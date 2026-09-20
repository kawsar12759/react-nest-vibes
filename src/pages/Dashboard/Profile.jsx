import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../providers/AuthProvider";
import AvatarUploader from "../../components/AvatarUploader";

const Profile = () => {
    const { user, updateUserProfile, resetPassword } = useAuth();
    const [name, setName] = useState(user.displayName || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const dirty = name.trim() !== (user.displayName || "") || photoURL !== (user.photoURL || "");
    const usesPassword = user.providerData.some((p) => p.providerId === "password");

    const save = async (e) => {
        e.preventDefault();
        if (name.trim().length < 2) {
            toast.error("Enter a name with at least 2 characters.");
            return;
        }
        setSaving(true);
        try {
            await updateUserProfile({ displayName: name.trim(), photoURL: photoURL || null });
            toast.success("Profile saved");
        } catch {
            toast.error("Couldn’t save your profile. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const sendReset = async () => {
        try {
            await resetPassword(user.email);
            toast.success("Password reset email sent", { description: user.email });
        } catch {
            toast.error("Couldn’t send the reset email. Try again.");
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h2 className="display text-3xl">Profile</h2>
            <form onSubmit={save} className="card space-y-6 p-6 sm:p-8">
                <AvatarUploader value={photoURL} name={name || user.email} onChange={setPhotoURL} onBusyChange={setUploading} />
                <div>
                    <label htmlFor="name" className="field-label">Display name</label>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className="field" />
                    <p className="field-hint">Shown on your listings and tour requests.</p>
                </div>
                <div>
                    <label htmlFor="email" className="field-label">Email</label>
                    <input id="email" value={user.email} readOnly className="field cursor-not-allowed bg-sunken text-muted" />
                </div>
                <div className="flex justify-end gap-2 border-t border-line pt-5">
                    <button type="button" disabled={!dirty} onClick={() => { setName(user.displayName || ""); setPhotoURL(user.photoURL || ""); }} className="btn-quiet">
                        Discard
                    </button>
                    <button type="submit" disabled={!dirty || uploading || saving} className="btn-primary !px-6">
                        {saving ? "Saving…" : uploading ? "Uploading photo…" : "Save profile"}
                    </button>
                </div>
            </form>

            {usesPassword && (
                <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-bold">Password</h3>
                        <p className="text-sm text-muted">We&apos;ll email you a link to set a new one.</p>
                    </div>
                    <button onClick={sendReset} className="btn-ghost shrink-0">Send reset link</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
