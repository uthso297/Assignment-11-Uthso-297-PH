import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
import PageTitle from "../Components/PageTitle";

const Register = () => {
    const { createUser, setUser, updateUserProfile, handleGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");

    const validatePassword = (password) => {
        const isValid =
            password.length >= 6 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password);
        return isValid;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photourl = form.photourl.value;
        const password = form.password.value;

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters long and contain both uppercase and lowercase letters.");
            return;
        }

        setPasswordError("");

        // console.log(name, email, photourl, password);

        createUser(email, password)
            .then(result => {
                setUser(result.user);
                updateUserProfile({ displayName: name, photoURL: photourl });
                navigate('/');
                console.log(result.user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleGoogle = () => {
        handleGoogleLogin()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <PageTitle title="Book Matrix || Register"></PageTitle>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Register for Our App</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Photo URL Input */}
                    <div>
                        <label htmlFor="photourl" className="block text-sm font-semibold text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photourl"
                            placeholder="Enter your photo URL"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {/* Show error message if password is invalid */}
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>

                    {/* Already Registered */}
                    <p className="text-sm text-center mt-4">
                        Already registered?
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                            Login
                        </Link>
                    </p>
                </form>

                {/* Register with Google Button */}
                <button
                    onClick={handleGoogle}
                    className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                    <FaGoogle className="mr-3 text-xl" />
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
