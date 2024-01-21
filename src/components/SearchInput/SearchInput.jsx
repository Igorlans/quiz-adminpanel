import React from 'react';
import {IoMdSearch} from "react-icons/io";
import {TextField} from "@mui/material";
import classes from "./searchInput.module.scss"

const SearchInput = ({search, setSearch}) => {
    return (
        <div className={classes.search}>
            <TextField
                color={'secondary'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size={"small"}
                className={classes.search_input}
                id="outlined-basic"
                label="Пошук"
                variant="outlined"
                width={300}
                InputProps={{
                    style: {borderRadius: 15}
                }}
            />
            <IoMdSearch className={classes.search_icon} size={'1.5em'}/>
        </div>
    );
};

export default SearchInput;