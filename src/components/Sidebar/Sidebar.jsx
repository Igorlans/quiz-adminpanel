import React from "react";
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/home.svg";

const Sidebar = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <h1 className={classes.title}>Панель керування</h1>
            </div>
            <nav className={classes.list}>
                {/*<NavLink*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive*/}
                {/*            ? classes.active + ` ${classes.item}`*/}
                {/*            : classes.item*/}
                {/*    }*/}
                {/*    to="questions"*/}
                {/*>*/}
                {/*    <img className={classes.item_icon} src={homeIcon} />*/}
                {/*    База питань*/}
                {/*</NavLink>*/}
                {/*<NavLink*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive*/}
                {/*            ? classes.active + ` ${classes.item}`*/}
                {/*            : classes.item*/}
                {/*    }*/}
                {/*    to="games"*/}
                {/*>*/}
                {/*    <img className={classes.item_icon} src={homeIcon} />*/}
                {/*    Ігри*/}
                {/*</NavLink>*/}
                {/*<NavLink*/}
                {/*    className={({ isActive }) =>*/}
                {/*        isActive*/}
                {/*            ? classes.active + ` ${classes.item}`*/}
                {/*            : classes.item*/}
                {/*    }*/}
                {/*    to="categories"*/}
                {/*>*/}
                {/*    <img className={classes.item_icon} src={homeIcon} />*/}
                {/*    Категорії*/}
                {/*</NavLink>*/}
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? classes.active + ` ${classes.item}`
                            : classes.item
                    }
                    to="games"
                >
                    <img className={classes.item_icon} src={homeIcon} />
                    Ігри
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
