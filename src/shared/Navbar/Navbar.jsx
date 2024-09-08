import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#0D9488] !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#0D9488] active:!bg-[#004D40] active:!text-[#FFFFFF]  visited:!bg-[#F5F5F5] visited:!text-[#0D9488]" : "active:!bg-[#004D40] active:!text-[#FFFFFF]"} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#0D9488] !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#0D9488] active:!bg-[#004D40] active:!text-[#FFFFFF]  visited:!bg-[#F5F5F5] visited:!text-[#0D9488]" : "active:!bg-[#004D40] active:!text-[#FFFFFF]"} to='/about'>About Us</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#0D9488] !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#0D9488] active:!bg-[#004D40] active:!text-[#FFFFFF]  visited:!bg-[#F5F5F5] visited:!text-[#0D9488]" : "active:!bg-[#004D40] active:!text-[#FFFFFF]"} to='/blog'>Blog</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#0D9488] !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#0D9488] active:!bg-[#004D40] active:!text-[#FFFFFF]  visited:!bg-[#F5F5F5] visited:!text-[#0D9488]" : "active:!bg-[#004D40] active:!text-[#FFFFFF]"} to='/reviews'>Reviews</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#0D9488] !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#0D9488] active:!bg-[#004D40] active:!text-[#FFFFFF]  visited:!bg-[#F5F5F5] visited:!text-[#0D9488]" : "active:!bg-[#004D40] active:!text-[#FFFFFF]"} to='/updateprofile'>Update Profile</NavLink></li>
    </>

    return (
        <div className="bg-[#0D9488] text-[#E5E7EB] px-16 py-2">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 text-[#0D9488] rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-2xl">NestVibes</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-12 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <Link><button className="bg-[#4CAF50] text-[#FFFFFF] px-6 py-3 rounded-md mr-5 font-semibold">Sign In</button></Link>
                    <Link className="bg-[#FF5722] text-[#FFFFFF] px-6 py-3 rounded-md font-semibold"><button>Sign Up</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;