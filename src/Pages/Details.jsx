// import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../Components/Spinner";

const Details = () => {
    const book = useLoaderData();
    const handleBorrow = (e) => {
        console.log(e)
        console.log(typeof(e))
    }
    if (!book) {
        return <Spinner></Spinner>
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full overflow-hidden">
                <div className="relative">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-96 rounded-t-lg"
                    />
                </div>

                <div className="px-6 py-4">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">{book.title}</h2>
                    <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

                    <div className="space-y-2 mb-4">
                        <p className="text-lg text-gray-700">
                            <strong>Available Quantity:</strong> {book.quantity}
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong>Description:</strong> {book.book_content}
                        </p>
                    </div>

                    <div className="mt-4">
                        <button onClick={() => handleBorrow(book._id)} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Borrow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;