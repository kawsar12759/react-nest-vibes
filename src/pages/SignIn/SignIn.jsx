import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
    const { signInWithEmail, user, signInWithGoogle } = useContext(AuthContext);
    
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

    const handleGoogleSignIn =() =>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>{
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
    return (
        <div>
            <div>
                <div className="hero bg-[#F3F4F6] p-28">
                    <div className="">
                        <ToastContainer />
                        <div className="text-center text-[#374151]">
                            <h1 className="text-5xl font-bold mb-4">Welcome to NestVibes</h1>
                            <p className="mb-10">Log in to access your personalized recommendations, and manage your account.</p>
                        </div>
                        <div className="card max-w-lg mx-auto bg-[#F9FAFB] border border-[#E5E7EB] w-full shadow-2xl">
                            <form onSubmit={handleSignIn} className="card-body mb-0 pb-0">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="input input-bordered w-full" required />
                                        <span onClick={() => setShowPassword(!showPassword)} className='absolute top-4 right-1 mb-0 cursor-pointer'>
                                            {
                                                showPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-right">Forgotten Password?</p>
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

                                <div className=" mt-4">
                                    <p className="text-center">Don't have an account? <Link className="font-semibold" to='/signup'>Sign Up</Link></p>
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