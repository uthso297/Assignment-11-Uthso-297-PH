import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAvailable, setShowAvailable] = useState(false);
    const [viewMode, setViewMode] = useState("card"); 
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/allBooks')
                .then(res => res.json())
                .then(data => {
                    setBooks(data);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    const handleUpdateClick = (book) => {
        navigate(`update/${book._id}`);
    };

    const filteredBooks = showAvailable
        ? books.filter(book => book.quantity > 0)
        : books;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="px-4 py-4">
                {/* Toggle View Dropdown */}
                <div className="mb-4 flex items-center space-x-4">
                    <button
                        onClick={() => setShowAvailable(!showAvailable)}
                        className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        {showAvailable ? "Show All Books" : "Show Available Books"}
                    </button>

                    {/* View Mode Dropdown */}
                    <select
                        onChange={(e) => setViewMode(e.target.value)}
                        value={viewMode}
                        className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg border border-gray-300"
                    >
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>

                {/* Display books based on view mode */}
                {viewMode === "card" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book, index) => (
                            <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                                <img className="w-full h-48" src={book.image} alt={book.title} />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                                    <p className="text-sm text-gray-600">{book.author}</p>
                                    <p className="text-sm text-gray-500 italic">{book.category}</p>
                                    <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>
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
                ) : (
                    // Table View
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Author</th>
                                <th className="py-2 px-4 border-b">Category</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Rating</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{book.title}</td>
                                    <td className="py-2 px-4">{book.author}</td>
                                    <td className="py-2 px-4">{book.category}</td>
                                    <td className="py-2 px-4">{book.quantity}</td>
                                    <td className="py-2 px-4">
                                        <span className="text-yellow-400">{'★'.repeat(book.rating)}</span> ({book.rating}/5)
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleUpdateClick(book)}
                                            className="py-1 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
};

export default AllBooks;
