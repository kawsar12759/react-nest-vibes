import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSignUp = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photourl.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmpassword.value;
        const termChecked = e.target.terms.checked;

        console.log(name, email, photo, password, confirmPassword, termChecked);

    }

    return (
        <div>
            <div>
                <div className="hero bg-[#F3F4F6] p-28">
                    <div className="">
                        <div className="text-center text-[#374151]">
                            <h1 className="text-5xl font-bold mb-2">Join NestVibes</h1>
                            <p className="mb-7">Sign up to unlock exclusive features and find your dream home.</p>
                        </div>
                        <div className="card bg-[#F9FAFB] border border-[#E5E7EB] w-full shadow-2xl">
                            <form className="card-body" onSubmit={handleSignUp}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Name</span>

                                    </label>
                                    <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Photo URL</span>
                                    </label>
                                    <input type="text" placeholder="Photo URL" name="photourl" className="input input-bordered" required />
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
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold">Confirm Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmpassword" className="input input-bordered w-full" required />
                                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute top-4 right-1 mb-0 cursor-pointer'>
                                            {
                                                showConfirmPassword ? <FaEyeSlash className="w-8" /> : <FaEye className="w-8" />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <input className="h-5 w-5" type="checkbox" name="terms" id="terms" />
                                    <label className="ml-2" htmlFor="terms">Accept our <a href="" className="font-medium">Terms and Conditions</a></label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-[#111827] text-[#E5E7EB] hover:bg-[#374151] hover:text-[#F9FAFB] ">Sign Up</button>
                                </div>
                                <div className=" mt-3">
                                    <p className="text-center">Already have an account? <Link className="font-semibold" to='/signin'>Sign In</Link></p>
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