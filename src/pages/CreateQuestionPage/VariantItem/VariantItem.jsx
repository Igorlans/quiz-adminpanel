import React from "react";
import classes from "./variantItem.module.scss";
import { IconButton } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const trueClasses = [classes.variant_item, classes.right].join(" ");
const falseClasses = [classes.variant_item, classes.false].join(" ");

const VariantItem = ({ variants, setVariants, variant, disabled }) => {
    const handleDelete = () => {
        const filteredVariants = variants.filter(
            (item) => item.id !== variant.id
        );
        setVariants(filteredVariants);
    };
    const handleEdit = () => {};

    return (
        <div className={variant.correct ? trueClasses : falseClasses}>
            <div className={classes.item_title}>{variant.value}</div>
            {!disabled ? (
                <div className={classes.item_btns}>
                    <IconButton onClick={handleDelete}>
                        <RiDeleteBin6Line />
                    </IconButton>
                </div>
            ) : null}
        </div>
    );
};

export default VariantItem;
