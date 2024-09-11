import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
    const { user, profileUpdate } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        displayName: user.displayName || "",
        photoURL: user.photoURL || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const { displayName, photoURL } = formData;

        profileUpdate(displayName, photoURL)
            .then(() => {
                // Profile successfully updated
                // You may want to add a success message here
                window.location.reload();
            })
            .catch(error => {
                // An error occurred
                // You may want to add an error message here
                console.error(error);
            });
    };

    return (
        
            <div>
                <Helmet>
                    <title>NestVibes | Update Profile</title>
                </Helmet>
                <div>
                    <div className="hero bg-[#F3F4F6] p-20">
                        <div>
                            <div className="text-center text-[#374151]">
                                <h1 className="text-5xl font-bold mb-4">Update Your Profile</h1>
                                <p className="mb-10">Manage your personal details to keep your profile up-to-date.</p>
                            </div>
                            <div className="mb-8 w-full">
                                <div className="flex justify-center mb-3">
                                    <img className="w-28 h-28 rounded-full" src={user.photoURL} alt="Profile" />
                                </div>
                                <p className="text-center text-2xl font-semibold">{user.displayName}</p>
                            </div>
                            <div className="card  bg-[#F9FAFB] border border-[#E5E7EB] w-full  shadow-2xl">
                                <form className="card-body" onSubmit={handleUpdateProfile}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            name="displayName"
                                            onChange={handleChange}
                                            value={formData.displayName}
                                            className="input input-bordered placeholder:text-xs"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            name="email"
                                            className="input input-bordered placeholder:text-xs bg-[#e5e5e5]"
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold">Photo URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter photo URL (jpg, jpeg, png, gif, bmp, or webp)"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleChange}
                                            className="input input-bordered placeholder:text-xs"
                                            required
                                        />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button
                                            type="submit"
                                            className="btn bg-[#111827] text-[#E5E7EB] hover:bg-[#374151] hover:text-[#F9FAFB]"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default UpdateProfile;
