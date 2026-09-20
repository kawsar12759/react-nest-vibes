import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../providers/AuthProvider";
import PageLoader from "../components/PageLoader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <PageLoader />;
    if (user) return children;
    return <Navigate to="/signin" replace state={{ from: location.pathname, fromProtected: true }} />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;
