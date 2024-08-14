import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AfterSignIn = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <PacmanLoader color="#00203f" />
            </div>
        );
    }

    if (!user) {
        return children;
    }

    return (
        <div>
            <Navigate to={location?.state ? location.state : "/"}></Navigate>
        </div>
    );
};

AfterSignIn.propTypes = {
    children: PropTypes.node,
};

export default AfterSignIn;
