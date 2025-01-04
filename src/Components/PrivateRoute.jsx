import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    console.log(location)
    if (user) {
        return children
    }
    else if (loading) {
        return <Spinner></Spinner>
    }
    else return <Navigate to='/login' state={location?.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;