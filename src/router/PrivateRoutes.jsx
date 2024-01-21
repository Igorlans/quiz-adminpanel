import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router";

const PrivateRoutes = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        isAuth ? <Outlet /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoutes;