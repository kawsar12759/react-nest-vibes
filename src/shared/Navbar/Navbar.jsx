import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/about'>About Us</NavLink></li>
        {user && <li><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/blogs'>Blog</NavLink></li>}
        <li><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/reviews'>Reviews</NavLink></li>
        {user && <li className=" md:hidden"><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/updateprofile'>{user.displayName}</NavLink></li>}
        {!user &&
            <li className=" xs:hidden"><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/signin'>Sign In</NavLink></li>}
        {!user && <li className=" xs:hidden"><NavLink className={({ isActive }) => isActive ? "!text-[#111827] font-semibold !bg-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#111827] active:!bg-[#374151] active:!text-[#F1F5F9]  visited:!bg-[#F5F5F5] visited:!text-[#111827]" : "active:!bg-[#374151] active:!text-[#F1F5F9] hover:bg-[#374151] hover:text-[#F9FAFB] "} to='/signup'>Sign Up</NavLink></li>

        }

    </>
    const handleSignOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                navigate('/signin', { state: { fromLogout: true } });
            }).catch((error) => {
                // An error happened.
            });
    }
    return (
        <div className="bg-[#111827] sticky text-[#E5E7EB] px-4 md:px-16 py-2 top-0 z-50">
            <div className="navbar">
                <div className="navbar-start w-fit xl:w-full ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
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
                            className="bg-white menu menu-sm dropdown-content bg-base-100 text-[#111827] rounded-box z-[1] mt-3 w-52  p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-2xl">NestVibes</Link>
                </div>
                <div className="navbar-center hidden xl:flex">
                    <ul className="menu menu-horizontal px-1 font-medium">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end w-full">
                    {user ?
                        <div className="flex items-center">
                            <p className="mr-4 hidden md:inline-block text-base lg:text-lg font-medium">{user.displayName}</p>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-4 sm:inline-block hidden">
                                <div className="">
                                    <Link to='/updateprofile'><img
                                        className="w-14 rounded-full"
                                        alt={user.displayName}
                                        src={user.photoURL}
                                    /></Link>
                                </div>

                            </div>

                            <button onClick={handleSignOut} className="btn bg-[#EF4444] text-[#FFFFFF] hover:bg-[#DC2626] px-3 xs:px-6 py-1 xs:py-3 rounded-md font-semibold border-none">Sign Out</button>
                        </div>
                        :
                        <>
                            <Link to='/signin'><button className="btn bg-[#FBBF24] hidden xs:inline-block text-[#111827] hover:bg-yellow-600 px-6 py-3 rounded-md mr-5 font-semibold border-none">Sign In</button></Link>
                            <Link to='/signup'><button className="btn bg-[#0D9488] hidden xs:inline-block text-white hover:bg-[#0B7665] px-6 py-3 rounded-md font-semibold border-none">Sign Up</button></Link></>

                    }



                </div>
            </div>
        </div>
    );
};

export default Navbar;