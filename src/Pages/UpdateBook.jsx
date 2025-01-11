import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
    const params = useParams();
    const id = (params.id)
    const [book, setBook] = useState({
        image: '',
        title: '',
        quantity: 1,
        author: '',
        category: '',
        short_description: '',
        rating: 1,
        book_content: ''
    });
    useEffect(() => {
        fetch(`http://localhost:5000/allBooks/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
            })
    }
        , [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        console.log(book)

        fetch(`http://localhost:5000/allBooks/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Update Book</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Book Cover Image URL
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={book.image}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter book cover image URL"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Book Title
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={book.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter the book title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter quantity"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter author's name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Novel">Novel</option>
                        <option value="Thriller">Thriller</option>
                        <option value="History">History</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                        Short Description
                    </label>
                    <textarea
                        id="short_description"
                        name="short_description"
                        value={book.short_description}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write a brief description of the book"
                        rows="3"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={book.rating}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        min="1"
                        max="5"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="bookContent" className="block text-sm font-medium text-gray-700">
                        Book Content
                    </label>
                    <textarea
                        id="book_content"
                        name="book_content"
                        value={book.book_content}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter detailed book content"
                        rows="5"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </form>


        </div>
    );
};

export default UpdateBook;