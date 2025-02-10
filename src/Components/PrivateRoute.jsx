import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    // console.log(location)
    if (user) {
        return children
    }
    else if (loading) {
        return <Spinner></Spinner>
    }

    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have to login to access this feature!",
        });

        return <Navigate to='/login' state={{ from: location }} />;
    }
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;