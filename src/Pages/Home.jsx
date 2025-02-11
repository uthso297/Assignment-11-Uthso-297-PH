import { useContext, useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
import PageTitle from "../Components/PageTitle";

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const { setCat } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.search)
    useEffect(() => {
        if (location.search) {
            navigate("/", { replace: true });
        }
        // setTimeout(() => {

        // }, 2000);
        fetch('https://library-management-system-server-delta.vercel.app/allBooks')
            // fetch('https://library-management-system-server-delta.vercel.app/allBooks')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            const category = books.map(book => book.category);
            const uniqueCategory = [...new Set(category)];
            setCategories(uniqueCategory);
        }
    }, [books]);

    const handleCat = (category) => {
        setCat(category);
        navigate(`/categorywiseBook?category=${category}`)
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Update the document and localStorage when theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);  // Save theme to localStorage
        document.documentElement.setAttribute("data-theme", theme);  // Apply theme to <html>
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };


    return (
        <div className="pt-28 px-4">
            <PageTitle title="Home||Book Matrix"></PageTitle>
            {/* theme control */}

            <label className="swap swap-rotate absolute z-20 right-1 top-16">
                <input type="checkbox" checked={theme === "dark"} onChange={handleThemeToggle} />
                {/* Sun icon */}
                <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                    />
                </svg>
                {/* Moon icon */}
                <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                    />
                </svg>
            </label>

            {/* banner section */}

            <Carousel></Carousel>
            {/* categories section */}
            <div className={`py-3 my-5 ${theme === 'light' ? 'text-black' : 'text-white'}`} >
                <h1 className="text-center text-3xl font-semibold mb-3">Explore Book Categories</h1>

                <p className="px-4 text-lg ">Explore a wide variety of book categories to discover your next great read. From thrilling mysteries and heartwarming fiction to informative non-fiction and thought-provoking science fiction, our collection has something for every reader. Browse through different genres and find books that match your interests, whether you're looking for an escape, learning, or inspiration.</p>


                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-4">
                        {/* Loop through categories and render each one */}
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCat(category)}
                                    className=" p-4 hover:shadow-xl duration-200 px-3 py-2 rounded-lg transform transition bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-indigo-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base cursor-pointer flex justify-center items-center"
                                >
                                    <button className="text-xl font-semibold text-black">{category}</button>
                                </div>
                            ))
                        ) : (
                            <p>No categories available</p>
                        )}
                    </div>
                )}
            </div>
            {/* extra 1 */}
            <div className="my-8 bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">What Readers Are Saying</h2>
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-gray-700">&quot;This book was amazing! A must-read for anyone interested in sci-fi.&quot;</p>
                        <div className="flex items-center mt-4">
                            <img src="https://i.ibb.co.com/JQN8V32/userpic.jpg" alt="User" className="w-8 h-8 rounded-full mr-3" />
                            <span className="font-semibold">John Doe</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* extra 2 */}
            <div className="my-8 bg-blue-500 text-white px-4 py-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Stay Updated!</h2>
                <p className="mb-4">Sign up for our newsletter to receive the latest book recommendations and special offers.</p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg mb-4"
                />
                <button className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-600">
                    Subscribe
                </button>
            </div>


        </div>
    );
};

export default Home;