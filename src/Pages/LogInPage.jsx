import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
import PageTitle from "../Components/PageTitle";
import Swal from "sweetalert2";

const LogInPage = () => {
    const { signInUser, handleGoogleLogin, resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailForReset, setEmailForReset] = useState("");

    console.log(location.state);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const handleGoogle = () => {
        handleGoogleLogin()
            .then(result => {
                console.log(result.user);
                
                navigate(location.state || '/');
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully Login",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleForget = () => {
        setIsModalOpen(true);
    };

    const handleResetPassword = () => {
        if (emailForReset) {
            resetPassword(emailForReset)
                .then(() => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Password reset link sent successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsModalOpen(false);
                })
                .catch(error => {
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: error.message || "Something went wrong. Try again.",
                        showConfirmButton: true
                    });
                });
        } else {
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: "Please enter a valid email",
                showConfirmButton: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <PageTitle title="Book Matrix || Login"></PageTitle>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <button
                            type="button"
                            className="text-sm text-blue-500 hover:underline"
                            onClick={handleForget}
                        >
                            Forgot Password?
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {/* Register */}
                <p className="text-sm text-center mt-4">
                    Don&apos;t have an account?
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                        Register
                    </Link>
                </p>
                {/* Login with Google Button */}
                <button
                    onClick={handleGoogle}
                    className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                    <FaGoogle className="mr-3 text-xl" />
                    Login with Google
                </button>
            </div>

            {/* Forgot Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Reset Password</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600" htmlFor="reset-email">Email</label>
                            <input
                                type="email"
                                value={emailForReset}
                                onChange={(e) => setEmailForReset(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleResetPassword}
                                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogInPage;
