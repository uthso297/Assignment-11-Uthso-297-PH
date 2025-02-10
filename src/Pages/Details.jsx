import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import PageTitle from "../Components/PageTitle";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
    const book = useLoaderData();
    const { user } = useContext(AuthContext);
    const { displayName, email } = user;
    const [returnDate, setReturnDate] = useState("")
    const [updatedBook, setUpdatedBook] = useState(book);
    const [modal, setModal] = useState(false);
    const [match, setMatch] = useState(false);
    const [title, setTitle] = useState([]);

    const handleCloseModal = () => {
        setModal(false);
    }
    const handleOpenModal = () => {
        setModal(true)
    }

    const handleBorrow = () => {
        handleOpenModal();

    }

    useEffect(() => {
        // fetch(`https://library-management-system-server-delta.vercel.app/borrow?email=${email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         const ids = data.map(item => item._id);
        //         setBids(ids);
        //     })

        axios.get(`https://library-management-system-server-delta.vercel.app/borrow?email=${email}`, {
            withCredentials: true
        })
            .then(res => {
                const titles = res.data.map(item => item.title);
                setTitle(titles);
            })
    }, [email])
    // console.log(match);
    useEffect(() => {
        if (title.includes(updatedBook.title)) {
            setMatch(true);
        } else {
            setMatch(false);
        }
    }, [title, updatedBook.title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const bookReturnDate = returnDate;
        const currentDate = new Date().toISOString().split('T')[0];
        // console.log(name, email, bookReturnDate)
        const id = updatedBook._id;
        // console.log(id)
        const borrowedBook = {
            name,
            email,
            bookReturnDate,
            currentDate,
            title: updatedBook.title,
            image: updatedBook.image,
            category: updatedBook.category
        }
        if (updatedBook.quantity <= 0) {
            alert('sorry not available')
            handleCloseModal()
            return
        }
        else if (match === true) {
            alert('already borrowed')
            handleCloseModal()
            return
        }
        else {
            fetch(`https://library-management-system-server-delta.vercel.app/allBooks/${id}/borrow`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    fetch(`https://library-management-system-server-delta.vercel.app/borrow`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(borrowedBook)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged === true) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Borrowed book successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                })
            setUpdatedBook((prevBook) => ({
                ...prevBook,
                quantity: prevBook.quantity - 1,
            }));
            handleCloseModal();
        }
    }

    if (!book) {
        return <Spinner></Spinner>
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <PageTitle title="Book Matrix || Details"></PageTitle>

            <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full overflow-hidden">
                <div className="relative">
                    <img
                        src={updatedBook.image}
                        alt={updatedBook.title}
                        className="w-full h-96 rounded-t-lg"
                    />
                </div>

                <div className="px-6 py-4">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">{updatedBook.title}</h2>
                    <p className="text-xl text-gray-600 mb-4">by {updatedBook.author}</p>

                    <div className="space-y-2 mb-4">
                        <p className="text-lg text-gray-700">
                            <strong>Available Quantity:</strong> {updatedBook.quantity}
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong>Description:</strong> {updatedBook.book_content}
                        </p>
                    </div>

                    <div className="mt-4">
                        <button disabled={updatedBook.quantity <= 0} onClick={() => handleBorrow(updatedBook._id)} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Borrow
                        </button>
                    </div>
                </div>
            </div>

            {/* mocal */}

            {
                modal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Borrow Book</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={displayName}
                                    readOnly
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    readOnly
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="returnDate" className="block text-gray-700">
                                    Return Date:
                                </label>
                                <input
                                    type="date"
                                    id="returnDate"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </div>)
            }
            {/* modal */}
        </div>

    );
};

export default Details;
