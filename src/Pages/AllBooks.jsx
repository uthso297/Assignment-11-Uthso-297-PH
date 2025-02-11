import { useContext, useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { AuthContext } from "../Components/AuthProvider";
import Swal from "sweetalert2";

const AllBooks = () => {
    const { user } = useContext(AuthContext)
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAvailable, setShowAvailable] = useState(false);
    const [viewMode, setViewMode] = useState("card");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://library-management-system-server-delta.vercel.app/allBooks')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            });
    }, []);

    const handleUpdateClick = (book) => {
        if (user) {
            navigate(`update/${book._id}`);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have to login to access this feature!"
            });
            navigate(`update/${book._id}`);
        }
    };

    const sortedBooks = [...books].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.quantity - b.quantity;
        } else {
            return b.quantity - a.quantity;
        }
    });

    const filteredBooks = showAvailable
        ? sortedBooks.filter(book => book.quantity > 0)
        : sortedBooks;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="px-4 pt-20">
                <PageTitle title="Book Matrix || All Books"></PageTitle>

                {/* Toggle View Dropdown */}
                <div className="mb-7 space-y-4 md:space-y-0 md:flex md:items-center md:justify-evenly">
                    <div>
                        <button
                            onClick={() => setShowAvailable(!showAvailable)}
                            className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            {showAvailable ? "Show All Books" : "Show Available Books"}
                        </button>
                    </div>

                    <div>
                        {/* Sort by Quantity Dropdown */}
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            value={sortOrder}
                            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg border border-gray-300"
                        >
                            <option value="asc">Sort by Ascending Quantity</option>
                            <option value="desc">Sort by Descending Quantity</option>
                        </select>
                    </div>

                    <div>
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

