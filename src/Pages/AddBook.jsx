import { useState } from 'react';
import PageTitle from '../Components/PageTitle';

const AddBook = () => {
    const [bookDetails, setBookDetails] = useState({
        image: '',
        title: '',
        quantity: '',
        author: '',
        category: '',
        short_description: '',
        rating: '',
        book_content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({
            ...bookDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Book details submitted:', bookDetails);
        setBookDetails({
            image: '',
            title: '',
            quantity: '',
            author: '',
            category: '',
            short_description: '',
            rating: '',
            book_content: '',
        });
        // console.log(bookDetails)

        fetch('http://localhost:5000/allBooks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookDetails)
        })
            .then(res => res.json())
            .then(data =>
                console.log(data)
            )
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <PageTitle title="Book Matrix || Add Book"></PageTitle>

            <h2 className="text-2xl font-bold text-center mb-6">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Book Cover Image URL
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={bookDetails.image}
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
                        id="title"
                        name="title"
                        value={bookDetails.title}
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
                        value={bookDetails.quantity}
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
                        value={bookDetails.author}
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
                        value={bookDetails.category}
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
                        value={bookDetails.short_description}
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
                        value={bookDetails.rating}
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
                        value={bookDetails.book_content}
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
                    Add Book
                </button>
            </form>


        </div>
    );
};

export default AddBook;
