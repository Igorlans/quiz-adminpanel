import classes from "./sortForm.module.scss";
import { IconButton } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";

const VariantItem = ({ variants, setVariants, variant, disabled }) => {
    const handleDelete = () => {
        const filteredVariants = variants.filter(
            (item) => item.id !== variant.id
        );
        setVariants(filteredVariants);
    };

    return (
        <div className={classes.sort_item}>
            <div className={classes.item_title}>{variant.name}</div>
            <div className={classes.item_btns}>
                {!disabled ? (
                    <div className={classes.item_btns}>
                        <IconButton onClick={handleDelete}>
                            <RiDeleteBin6Line />
                        </IconButton>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VariantItem;
