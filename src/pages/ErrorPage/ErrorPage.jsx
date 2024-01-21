import React from 'react';
import classes from "./errorPage.module.css";

const ErrorPage = () => {
    return (
        <div className={classes.error}>
            <div className={classes.status}>Error 404</div>
            <div className={classes.text}>Page is not found</div>
        </div>
    );
};

export default ErrorPage;