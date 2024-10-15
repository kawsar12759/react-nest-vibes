import { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
    const { signInWithEmail, user, signInWithGoogle, forgetPass } = useContext(AuthContext);
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const showToast = location.state?.fromProtected;
    const fromLogout = location.state?.fromLogout;
    useEffect(() => {
        if (showToast && !fromLogout) {
            toast.info('Please sign in to gain full access.');
            navigate('/signin', { replace: true, state: {} });
        }
    }, [showToast, fromLogout, navigate]);


    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home page if user is logged in
        }
    }, [user, navigate]);
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }
    const handleSignIn = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;



        signInWithEmail(email, password)
            .then(result => {
                // Signed in 
                console.log(result.user);

            })
            .catch((error) => {
                toast.error(error.message === "Firebase: Error (auth/invalid-credential)." ? 'Invalid credentials! Please try again.' : error.message)
                console.error(error.message);
            });


    }
    const handleForgetPass = e => {
        const emailForReset = emailRef.current.value;
        console.log(emailForReset);
        if (emailForReset === '') {
            console.log('Returned');
            return;
        }


        forgetPass(emailForReset)
            .then(() => {
                // Password reset email sent!
                // ..\
                toast.info('A password reset link has been sent to your email.');
            })
            .catch((error) => {

                // ..
            });


    }
    return (
        <div>
            <Helmet>
                <title>NestVibes | Sign In</title>
            </Helmet>
            <div>
                <div className="hero  bg-[#F3F4F6] p-6 sm:p-28">
                    <dialog id="my_modal_5" className="modal xs:w-4/5 mx-auto   modal-middle">

                        <div className="modal-box bg-[#FFFFFF] ">
                            <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-4">Reset Password</h1>
                            <hr className="text-black mb-3" />
                            <form method="dialog" >
                                <div className="form-control mb-4">
                                    <label className="label mb-4">
                                        <span className="label-text text-sm xs:text-base font-medium">Enter the email associated with your account to receive a password reset link</span>
                                    </label>
                                    <input type="email" name="emailforreset" ref={emailRef} placeholder="Enter Your Email" className="input input-bordered mb-3 bg-white" />

                                </div>
                                <hr className="mb-3" />
                                <div className="flex justify-end">
                                    <button className="btn bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] hover:text-[#111827] mr-3">Cancel</button>
                                    <button onClick={handleForgetPass} className="btn bg-[#111827] text-[#E5E7EB] hover:bg-[#374151] hover:text-[#F9FAFB]">Reset Password</button>
                                </div>


                            </form>
                        </div>
                    </dialog>
                    <div className="">
                        <ToastContainer />
                        <div className="text-center text-[#374151]">
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-4">Welcome to NestVibes</h1>
                            <p className="mb-10">Log in to access your personalized recommendations, and manage your account.</p>
                        </div>
                        <div className="card max-w-lg  mx-auto bg-[#F9FAFB] border border-[#E5E7EB] shadow-2xl">
                            <form onSubmit={handleSignIn} className="card-body mb-0 pb-0">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" name="email" className="input input-bordered bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg xs:text-xl font-semibold text-black
                                        ">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="input input-bordered w-full bg-white" required />
                                        <span onClick={() => setShowPassword(!showPassword)} className='absolute top-4 right-1 mb-0 cursor-pointer'>
                                            {
                                                showPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span onClick={() => document.getElementById('my_modal_5').showModal()} className=" font-medium hover:font-semibold text-sm xs:text-base hover:underline cursor-pointer text-black">Forgotten Password?</span>
                                </div>


                                <div className="form-control mt-4">
                                    <button className="btn bg-[#111827] text-[#E5E7EB] hover:bg-[#374151] hover:text-[#F9FAFB] ">Sign In</button>
                                </div>

                            </form>
                            <div className="card-body">
                                <div className="flex items-center mb-4 w-3/4 mx-auto">
                                    <div className="w-full h-px bg-gray-300"></div>
                                    <span className="mx-3 text-gray-500">or</span>
                                    <div className="w-full h-px bg-gray-300"></div>
                                </div>
                                <div className="">
                                    <button onClick={handleGoogleSignIn} className="btn bg-[#F9FAFB] text-[#111827] border-[#111827] hover:bg-[#374151] hover:text-[#F9FAFB] w-full"><FcGoogle className="text-2xl" />Sign In with Google</button>
                                </div>

                                <div className=" mt-4 text-black">
                                    <p className="text-center text-sm xs:text-base">Don't have an account? <Link className="font-semibold" to='/signup'>Sign Up</Link></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;