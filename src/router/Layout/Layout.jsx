import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet} from "react-router";
import classes from "./layout.module.css";
const Layout = () => {

    return (
        <div className={classes.layout}>
            <Sidebar />
            <div className={classes.content}>
                <main className={classes.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;