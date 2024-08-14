import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Header = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    const navlinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/products">Products</NavLink>
            </li>
        </>
    );

    const logOutButton = () => {
        logOut()
            .then(() => {
                console.log("Successfully logged out");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (loading) {
        return (
            <div className="container mx-auto">
                <div className="flex justify-between items-center p-2">
                    <div className="skeleton h-12 w-28"></div>
                    <div className="items-center gap-2 hidden lg:flex">
                        <div className="skeleton h-9 w-20"></div>
                        <div className="skeleton h-9 w-20"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="skeleton h-12 w-20"></div>
                        <div className="skeleton h-12 w-20"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-3">
                            {navlinks}
                        </ul>
                    </div>
                    <Link className="text-xl p-2 uppercase font-normal">
                        AP <span className="text-red-600">Laptop</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">{navlinks}</ul>
                </div>
                <div className="navbar-end gap-2">
                    {user ? (
                        <>
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <a tabIndex={0} role="button" id="clickable">
                                    <div className="w-12 h-12 rounded-full border border-blue-600">
                                        <img className="rounded-full p-1" src={user?.photoURL} alt="" />
                                    </div>
                                </a>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52 border border-[#00203f]">
                                    <p className="text-center mb-2 text-[#00203f]">Name: {user.displayName}</p>
                                    <button className="btn text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white w-full border-0 rounded-2xl" onClick={logOutButton}>
                                        LogOut
                                    </button>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/signin">
                                <button className="btn text-white bg-[#00203f] h-10 hover:bg-transparent hover:text-[#00203f] border border-[#00203f] hover:border-[#00203f]">Sign In</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn text-white bg-[#00203f] h-10 hover:bg-transparent hover:text-[#00203f] border border-[#00203f] hover:border-[#00203f]">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
