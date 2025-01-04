import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { useLocation } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    console.log(location)
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

    const handleUpdateClick = (book) => {
        console.log("Updating book:", book);
    };

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-4">
                {books.map((book, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                        <img className="w-full h-48 object-cover" src={book.image} alt={book.title} />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-sm text-gray-600">{book.author}</p>
                            <p className="text-sm text-gray-500 italic">{book.category}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-400">{'★'.repeat(book.rating)}</span>
                                <span className="ml-1 text-gray-500">({book.rating}/5)</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{book.short_description}</p>
                            <button
                                onClick={() => handleUpdateClick(book)}
                                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

export default AllBooks;
