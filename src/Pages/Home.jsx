import { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import { Link } from "react-router-dom";

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch('Books.json')
                .then(res => res.json())
                .then(data => {
                    setBooks(data);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            const category = books.map(book => book.category);
            const uniqueCategory = [...new Set(category)];
            setCategories(uniqueCategory);
        }
    }, [books]);

    return (
        <div>
            {/* banner section */}
            <Carousel></Carousel>
            {/* categories section */}
            <div className="bg-[#f7f3ea] py-3">
                <h1 className="text-center text-3xl font-semibold mb-6">Explore Book Categories</h1>

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
                                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                                >
                                    <Link className=""><button className="text-xl font-semibold">{category}</button></Link>
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