import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { createUser, profileUpdate, setIsSigningUp, user } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home page if user is logged in
        }
    }, [user, navigate]);

    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photourl.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmpassword.value;





        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            toast.warning('Provide a valid email address');
            return;
        }
        else if (!/^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[^\s]*)?\.(?:jpg|jpeg|png|gif|bmp|webp)$/.test(photo)) {
            toast.warning('Provide a valid Photo URL');
            return;
        }
        else if (password.length < 8) {
            toast.warning('Password length must be at least 8 characters');
            return;
        }
        else if (password !== confirmPassword) {
            toast.warning('Please Make sure both the passwords are same');
            return;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password)) {
            toast.warning('Password must contain at lease one upper case letter');
            return;
        }

        setIsSigningUp(true);
        createUser(email, password)
            .then(result => {

                profileUpdate(name, photo)
                    .then(() => {
                        // Profile updated!
                        setIsSigningUp(false);
                        // ...
                    })
                    .catch(error => {
                        // An error occurred
                        // ...
                    });
            })
            .catch(error => toast.error(error.message === "Firebase: Error (auth/email-already-in-use)." ? "Email already in use. Please try another one." : error.message));



    }

    return (
        <div>
            <Helmet>
                <title>NestVibes | Sign Up</title>
            </Helmet>
            <div>
                <div className="hero bg-[#F3F4F6] p-6 sm:p-28">
                    <div className="">
                        <ToastContainer />
                        <div className="text-center text-[#374151]">
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-4">Join NestVibes</h1>
                            <p className="mb-10">Sign up to unlock exclusive features and find your dream home.</p>
                        </div>
                        <div className="card bg-[#F9FAFB] border border-[#E5E7EB] w-full shadow-2xl">
                            <form className="card-body" onSubmit={handleSignUp}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Name</span>

                                    </label>
                                    <input type="text" placeholder="Enter Name" name="name" className="input input-bordered placeholder:text-xs bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Email</span>
                                    </label>
                                    <input type="email" placeholder="Enter Valid Email" name="email" className="input input-bordered placeholder:text-xs bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Photo URL</span>
                                    </label>
                                    <input type="text" placeholder="Enter photo URL (must be jpg, jpeg, png, gif, bmp, or webp)" name="photourl" className="input input-bordered placeholder:text-xs bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="Password: min 8 chars, contain uppercase & lowercase" name="password" className="input input-bordered w-full placeholder:text-xs bg-white" required />
                                        <span onClick={() => setShowPassword(!showPassword)} className='absolute top-4 right-1 mb-0 cursor-pointer'>
                                            {
                                                showPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Confirm Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmpassword" className="input input-bordered w-full placeholder:text-xs bg-white" required />
                                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute top-4 right-1 mb-0 cursor-pointer'>
                                            {
                                                showConfirmPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <input className="h-5 w-5 bg-white " type="checkbox" name="terms" id="terms" required />
                                    <label className="ml-2 text-sm xs:text-base text-black" htmlFor="terms">Accept our <span className="font-medium cursor-pointer">Terms and Conditions</span></label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-[#111827] text-[#E5E7EB] hover:bg-[#374151] hover:text-[#F9FAFB] ">Sign Up</button>
                                </div>
                                <div className=" mt-3">
                                    <p className="text-center text-sm xs:text-base text-black">Already have an account? <Link className="font-semibold" to='/signin'>Sign In</Link></p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;