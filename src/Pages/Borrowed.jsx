import { useState } from "react";

const Borrowed = () => {
    const [books, setBooks] = useState(null)

    const handleReturnClick = (book) => {
        console.log(book)
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-4">
                {books.map((book, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                        <img className="w-full h-48 object-cover" src={book.image} alt={book.title} />
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
                                onClick={() => handleReturnClick(book)}
                                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Return
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Borrowed;