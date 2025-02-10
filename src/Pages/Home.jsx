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

    return (
        <div className="pt-20">
            <PageTitle title="Home||Book Matrix"></PageTitle>
            {/* banner section */}
            <Carousel></Carousel>
            {/* categories section */}
            <div className="bg-[#f7f3ea] py-3">
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
            <div className="my-8 bg-blue-500 text-white mx-4 px-4 py-8 rounded-lg">
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