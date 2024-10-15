import { useContext } from "react";

import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div className="h-screen bg-white flex w-full justify-center items-center"><div className="flex items-center w-28 justify-between"><span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span></div></div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/signin' state={{ fromProtected: true }} ></Navigate>;

};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}