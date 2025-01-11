// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../Components/AuthProvider";
// const Navbar = () => {

//     const { user, signOutUser } = useContext(AuthContext);

//     const handeLogout = () => {
//         signOutUser()
//     }

//     const links = <>
//         <Link ><button className="hover:text-indigo-500">Home</button></Link>
//         <Link to='/allBooks'><button className="hover:text-indigo-500">All Books</button></Link>
//         <Link to='/addBook'><button className="hover:text-indigo-500">Add Books</button></Link>
//         <Link to='/borrowed'><button className="hover:text-indigo-500">Borrowed Books</button></Link>
//     </>
//     const buttons = <>
//         <Link to='/login'><button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">Login</button></Link>
//         <Link to='/register'> <button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">Register</button></Link>
//     </>

//     return (
//         <div className="flex bg-[#18150e] justify-between items-center px-4 py-4">
//             <div>
//                 <p className="font-bold text-sm text-white shadow-lg sm:text-2xl">BookMatrix</p>
//             </div>
//             <div className="">
//                 <ul className="font-semibold text-sm text-white shadow-lg sm:text-base flex items-center space-x-8 justify-between">
//                     {links}
//                 </ul>
//             </div>
//             <div className="space-x-3">
//                 {user ? (<div className="flex items-center justify-center">

//                     <div className="relative group">
//                         <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt={user?.displayName} />
//                         <div className="absolute left-0 top-full mt-2 w-max p-2 text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
//                             {user?.displayName}
//                         </div>
//                     </div>


//                     <button onClick={handeLogout} className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">Log Out</button>
//                 </div>) : (buttons)}
//             </div>

//         </div>
//     );
// };

// export default Navbar;

import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);

    const handeLogout = () => {
        signOutUser();
    };

    const links = (
        <>
            <NavLink to="/" className="text-white hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
            </NavLink>
            <NavLink to="/allBooks" className="text-white hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
                All Books
            </NavLink>
            <NavLink to="/addBook" className="text-white hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
                Add Books
            </NavLink>
            <NavLink to="/borrowed" className="text-white hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
                Borrowed Books
            </NavLink>
        </>
    );

    const buttons = (
        <>
            <Link to="/login">
                <button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">
                    Login
                </button>
            </Link>
            <Link to="/register">
                <button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">
                    Register
                </button>
            </Link>
        </>
    );

    return (
        <div>
            {/* Navbar container */}
            <nav className="bg-[#18150e] shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Website Logo/Name */}
                        <div className="flex-shrink-0">
                            <p className="font-bold text-sm text-white shadow-lg sm:text-2xl">BookMatrix</p>
                        </div>

                        {/* Hamburger Menu for Mobile */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navbar Links */}
                        <div className="hidden lg:flex space-x-8 items-center">
                            {links}

                            <div className="space-x-3">
                                {user ? (
                                    <div className="flex items-center justify-center gap-5">
                                        <div className="relative group">
                                            <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt={user?.displayName} />
                                            <div className="absolute left-0 top-full mt-2 w-max p-2 text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                                {user?.displayName}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handeLogout}
                                            className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    buttons
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Visible on smaller screens) */}
            <div
                className={`${isMobileMenuOpen ? "block" : "hidden"} lg:hidden bg-[#18150e] text-white`}
                name="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {links}

                    <div className="space-x-3 flex flex-col">
                        {user ? (
                            <div className="flex items-center justify-center">
                                <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt={user?.displayName} />
                                <button
                                    onClick={handeLogout}
                                    className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            buttons
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


