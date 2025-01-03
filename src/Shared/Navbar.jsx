import { Link } from "react-router-dom";

const Navbar = () => {

    const links = <>
        <Link ><button className="hover:text-indigo-500">Home</button></Link>
        <Link to='/allBooks'><button className="hover:text-indigo-500">All Books</button></Link>
        <Link to='/addBook'><button className="hover:text-indigo-500">Add Books</button></Link>
        <Link ><button className="hover:text-indigo-500">Borrowed Books</button></Link>
    </>
    const buttons = <>
        <button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">Login</button>
        <button className="inline-block px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base">Register</button>
    </>

    return (
        <div className="flex bg-[#18150e] justify-between items-center px-4 py-4">
            <div>
                <p className="font-bold text-sm text-white shadow-lg sm:text-2xl">BookMatrix</p>
            </div>
            <div className="">
                <ul className="font-semibold text-sm text-white shadow-lg sm:text-base flex items-center space-x-8 justify-between">
                    {links}
                </ul>
            </div>
            <div className="space-x-3">
                {buttons}
            </div>

        </div>
    );
};

export default Navbar;